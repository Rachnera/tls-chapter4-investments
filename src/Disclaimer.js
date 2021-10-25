import { Alert, Typography } from 'antd';

const { Title } = Typography;

const Disclaimer = () => {
  return (
    <div className="disclaimer">
      <div className="preamble">
        <Title>{`Investment Advisor`}</Title>
        <p>
          {`A tool to help you choose the best theoretical best possible investments for (the early steps of chapter 4 of) `}
          <a href="https://the-last-sovereign.blogspot.com/">{`The Last Sovereign`}</a>
          {`.`}
        </p>
        <p>{`Just fill in the requested information, choose your strategy and let a quasi-brute force algorithm determine what's best for you (assuming a definition of best here as highest short term returns, then lowest price, while still fulfilling the requirements of your strategy).`}</p>
        <p>
          {`This is definetely an advanced tool, intended for people who are already familiar with the game's `}
          <a href="https://thelastsovereign.miraheze.org/wiki/Secret_stats">
            {`inner workings`}
          </a>
          {`, with the awesome `}

          <a href="https://thelastsovereign.flarum.cloud/d/15-calculator">{`Calculator`}</a>
          {`, and are now looking for the last lousy optimizations they might have missed.`}
        </p>
      </div>
      <Alert
        message={`Assumptions`}
        description={
          <>
            <span>{`This tool takes for granted that:`}</span>
            <ol>
              <li>{`The Succubus Tower was visited during chapter 1.`}</li>
              <li>{`Simon invested in the bank during chapter 1 (with Megail and Trin help).`}</li>
              <li>{`Through chapter 2, AriGarda was bribed, the Order of Silence funded, and the Merchant's Guild joined.`}</li>
              <li>{`Tradesmasher and the Succubus Armorer were met during chapter 3.`}</li>
              <li>{`The three unique Trades (New Givini, Tak'Kan and Chalice States) were bought at the end of chapter 3.`}</li>
              <li>{`Chapter 3 in general was good enough for Yhilin to reach its final state during the first investment phase of Chapter 4.`}</li>
              <li>{`Chapter 3 in general and the war in particular were good enough for all petitions favorable to Givini to appear.`}</li>
              <li>{`All such petitions were approved.`}</li>
              <li>{`If purchased, the Givini Orc Merchant is bought before any other investment of the round.`}</li>
            </ol>
          </>
        }
        type="info"
        showIcon
        className="assumptions"
      />
    </div>
  );
};

export default Disclaimer;
