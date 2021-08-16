import './App.css';
import { Typography } from 'antd';
import FirstRound from './FirstRound';

const { Title } = Typography;

const App = () => {
  return (
    <div>
      <Title>{`Economically optimal early chapter 4 investments`}</Title>
      <FirstRound />
    </div>
  );
};

export default App;
