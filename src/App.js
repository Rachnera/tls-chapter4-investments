import './App.css';
import DummyForm from './DummyForm';
import { Typography } from 'antd';

const { Title } = Typography;

const App = () => {
  return (
    <div>
      <Title>{`Economically optimal early chapter 4 investments`}</Title>
      <DummyForm />
    </div>
  );
};

export default App;
