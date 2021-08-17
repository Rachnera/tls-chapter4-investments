import { useState } from 'react';
import Loading from './Loading';
import Disclaimer from './Disclaimer';
import Form from './Form';
import Result from './Result';

const onFinish = async ({
  values,
  workerInstance,
  setLoading,
  setCombinationsCount,
  setProgress,
  setInvestmentsCount,
  setPreprogress,
  setResult,
}) => {
  const {
    previous = [],
    remainingPron,
    baseProfit,
    strategy,
    startingSocial,
    ...misc
  } = values;

  setLoading(true);

  const params = {
    previousInvestments: previous,
    money: remainingPron + baseProfit,
    social: strategy === 'social' ? 40 - startingSocial : 0,
    giviniStart: 17 + previous.includes("Min's Trade Route"),
    giviniExtra: 6, // FIXME Approximate for now for simplicity's sake, but this value is interconnected with social
    ...misc,
  };

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

  setResult({
    input: values,
    output: result,
  });

  setLoading(false);
  setCombinationsCount(undefined);
  setInvestmentsCount(undefined);
  setProgress(0);
  setPreprogress(0);
};

const FirstRound = ({ workerInstance }) => {
  const [loading, setLoading] = useState(false);
  const [combinationsCount, setCombinationsCount] = useState();
  const [progress, setProgress] = useState(0);
  const [investmentsCount, setInvestmentsCount] = useState();
  const [preprogress, setPreprogress] = useState(0);
  const [result, setResult] = useState();

  if (!workerInstance) {
    return null;
  }

  return (
    <>
      <Disclaimer />
      <Form
        onFinish={(values) => {
          onFinish({
            values,
            setLoading,
            setCombinationsCount,
            setProgress,
            workerInstance,
            setPreprogress,
            setInvestmentsCount,
            setResult,
          });
        }}
        loading={loading}
      />
      {loading && (
        <Loading
          combinationsCount={combinationsCount}
          progress={progress}
          preprogress={preprogress}
          investmentsCount={investmentsCount}
        />
      )}
      {result && <Result input={result.input} output={result.output} />}
    </>
  );
};

export default FirstRound;
