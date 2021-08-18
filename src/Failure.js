import { Result, Card } from 'antd';

const Failure = ({ message }) => {
  return (
    <Card>
      <Result status="warning" title={message} />
    </Card>
  );
};

export default Failure;
