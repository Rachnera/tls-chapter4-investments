import { useEffect } from 'react';
import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax

let workerInstance;

const computeOptimal = async ({ params, callback }) => {
  const result = await workerInstance.optimalInvestments(params);
  callback(result);
};

const DummyForm = () => {
  useEffect(() => {
    workerInstance = worker();

    return () => {
      workerInstance.terminate();
    };
  }, []);

  return (
    <form>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          computeOptimal({
            params: {
              previousInvestments: [
                'Denmiel Mushrooms',
                'Eustrin Guild',
                "Min's Trade Route",
                'Yhilini Succubi Trade',

                'Givini Orc Merchant',
                'Bank of Givini',

                'Bank of Stineford',
                'Stineford Weapons Store',
                'Yhilini Brothel Reform',
                'Booze Shack',
                'Lonely Sailor Services',
                'Succubus Band Tour',
                'Mercenary Offices',
                'Imp Offices',
                'Trading Pillar Rights',
                'Gasm Falls Trade',

                'Hall of Mental Strength',
                'Orc Pools Upgrade',
              ],
              money: 42500 + 3262000 - 460000 - 700000,
              giviniStart: 35,
              giviniExtra: 1,
            },
            callback: (data) => console.log(data),
          });
        }}
      >{`Click me`}</button>
    </form>
  );
};

export default DummyForm;
