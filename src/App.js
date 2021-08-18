import './App.css';
import FirstRound from './first-round';
import { useEffect, useState } from 'react';
import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax
import Disclaimer from './Disclaimer';

const App = () => {
  const [workerInstance, setWorkerInstance] = useState();
  useEffect(() => {
    if (!workerInstance) {
      setWorkerInstance(worker());
    }

    return () => {
      workerInstance?.terminate();
    };
  }, [workerInstance]);

  return (
    <div>
      <Disclaimer />
      <FirstRound workerInstance={workerInstance} />
    </div>
  );
};

export default App;
