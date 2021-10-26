import Form from './Form';
import { Typography } from 'antd';

const { Title } = Typography;

const ThirdRound = ({ firstRoundResult, secondRoundResult }) => {
  const previousInvestments = [
    ...firstRoundResult.finalStandings.investments,
    ...secondRoundResult.finalStandings.investments,
  ];
  const previousResearch = [
    firstRoundResult.decisions.research,
    secondRoundResult.decisions.research,
  ];

  return (
    <div className="round-three">
      <Title level={2}>{`Chapter 4 – Round 3`}</Title>
      <Form
        previousInvestments={previousInvestments}
        previousResearch={previousResearch}
      />
    </div>
  );
};

export default ThirdRound;
