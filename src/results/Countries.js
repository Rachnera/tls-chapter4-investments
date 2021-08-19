import { Card } from 'antd';
import Givini from './Givini';

const Countries = ({ chapter3Investments, roundOneInvestments }) => {
  return (
    <Card title={`Countries`}>
      <Card title={`New Givini`} type="inner">
        <Givini
          chapter3Investments={chapter3Investments}
          roundOneInvestments={roundOneInvestments}
        />
      </Card>
    </Card>
  );
};

export default Countries;
