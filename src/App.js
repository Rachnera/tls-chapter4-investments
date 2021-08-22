import './App.css';
import FirstRound from './first-round';
import { useEffect, useState } from 'react';
import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax
import Disclaimer from './Disclaimer';
import Loading from './Loading';

const buildRunInWorker =
  ({
    workerInstance,
    setLoading,
    setCombinationsCount,
    setProgress,
    setInvestmentsCount,
    setPreprogress,
  }) =>
  async (params) => {
    setLoading(true);

    const investmentsCount = await workerInstance.prepare(params);
    setInvestmentsCount(investmentsCount);
    setPreprogress(0);
    let combinationsCount = 0;
    for (let i = 0; i <= investmentsCount; i++) {
      combinationsCount += await workerInstance.preprocess();
      setPreprogress(i / investmentsCount);
    }

    setCombinationsCount(combinationsCount);
    setProgress(0);
    const batchSize = 10000;
    let result;
    for (let i = 0; i < Math.ceil(combinationsCount / batchSize); i++) {
      const end = Math.min((i + 1) * batchSize, combinationsCount);
      result = await workerInstance.process(i * batchSize, end);
      setProgress(end / combinationsCount);
    }

    await workerInstance.clean();

    setLoading(false);
    setCombinationsCount(undefined);
    setInvestmentsCount(undefined);
    setProgress(0);
    setPreprogress(0);

    return result;
  };

const App = () => {
  const [workerInstance, setWorkerInstance] = useState();
  const [loading, setLoading] = useState(false);
  const [combinationsCount, setCombinationsCount] = useState();
  const [progress, setProgress] = useState(0);
  const [investmentsCount, setInvestmentsCount] = useState();
  const [preprogress, setPreprogress] = useState(0);

  useEffect(() => {
    if (!workerInstance) {
      setWorkerInstance(worker());
    }

    return () => {
      workerInstance?.terminate();
    };
  }, [workerInstance]);

  if (!workerInstance) {
    return null;
  }

  const runInWoker = buildRunInWorker({
    workerInstance,
    setLoading,
    setCombinationsCount,
    setProgress,
    setInvestmentsCount,
    setPreprogress,
  });

  return (
    <div>
      <Disclaimer />
      <FirstRound runInWoker={runInWoker} loading={loading} />
      {loading && (
        <Loading
          combinationsCount={combinationsCount}
          progress={progress}
          preprogress={preprogress}
          investmentsCount={investmentsCount}
        />
      )}
    </div>
  );
};

export default App;
