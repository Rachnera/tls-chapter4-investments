import './App.css';
import FirstRound from './FirstRound';
import { useEffect, useState } from 'react';
import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax

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
      <FirstRound workerInstance={workerInstance} />
    </div>
  );
};

export default App;
