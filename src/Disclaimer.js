import { Alert, Typography } from 'antd';

const { Title } = Typography;

const Disclaimer = () => {
  return (
    <div className="disclaimer">
      <div className="preamble">
        <Title>{`Investment Advisor`}</Title>
        <p>
          {`A tool to help you choose the best theoretical best possible investments for chapter 4 of `}
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
            <p>
              <a href="https://www.patreon.com/posts/demographics-8851324">{`About 85% of players have only ever played TLS with Reshaped Varia.`}</a>
            </p>
            <p>{`That means if I was to write a walkthrough for TLS that only covered a "Reshaped Varia" strategy, it'll still be usable by 85% of players. Of course, I will have to release a "Dominated Varia" variant eventually to account for the remaining 15%. But in the meantime, that's already 85% of people that can start playing with my walkthrough without waiting any further. Meanwhile, if I had tried to cover both cases from the start, 100% of people would have had to wait.`}</p>
            <p>{`While I'm writing a software and not a walkthrough here, it will play by the same logic: Focus first on the "general case", by making a few (many) assumptions that hopefully will be true of most "good" saves, so to be able to release it to the public early. Then slowly cover the other cases in subsequent updates.`}</p>
            <p>{`Therefore, at the moment, this tool takes for granted that:`}</p>
            <ol>
              <li>{`The Succubus Tower was visited during chapter 1.`}</li>
              <li>{`Simon invested in the bank during chapter 1.`}</li>
              <li>{`The Iron Cudgel was hired (in either chapter 1 or 2).`}</li>
              <li>{`Through chapter 2, the AriGarda was bribed, the Merchant's Guild joined, and the Ardan Bank invested into.`}</li>
              <li>{`Tradesmasher and the Succubus Armorer were met during chapter 3.`}</li>
              <li>{`The three unique Trades (New Givini, Tak'Kan and Chalice States) were bought at the end of chapter 3.`}</li>
              <li>{`Chapter 3 in general was good enough for Yhilin to reach its final state during the first investment phase of Chapter 4.`}</li>
              <li>{`Chapter 3 in general and the war in particular were good enough for all petitions favorable to Givini to appear.`}</li>
              <li>{`All such petitions were approved.`}</li>
            </ol>
            <p>{`Note that the final version of the advisor will likely still have a few assumptions in it, so as to keep the complexity in check. Namely, "disaster runs" will never be covered.`}</p>
            <p>{`tl;dr The Advisor is currently in early access.`}</p>
          </>
        }
        type="info"
        showIcon={true}
        className="assumptions"
        closable={true}
      />
    </div>
  );
};

export default Disclaimer;
