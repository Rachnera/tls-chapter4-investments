import {
  Form,
  Select,
  InputNumber,
  Button,
  Card,
  Checkbox,
  Radio,
  Alert,
  Spin,
  Progress,
} from 'antd';
import { useState } from 'react';

const possiblePrevious = [
  "Min's Trade Route",
  'Yhilini Succubi Trade',
  'Yhilini Bank Core Lender',
  'Mercenary Offices',
  'Theltiar Rentals',
  'Theltiar Flowhouse',
  'Denmiel Mushrooms',
  'Denmiel Archives',
  'Eustrin Guild',
  'Gasm Falls Trade',
  'Premium Steel Owner',
];

const initialValues = {
  previous: [
    'Premium Steel Owner',
    "Min's Trade Route",
    'Yhilini Succubi Trade',
    'Eustrin Guild',
  ],
  remainingPron: 5000,
  baseProfit: 2000000,
  chapter1Bank: true,
  chapter1Steel: false,
  strategy: 'social',
  startingSocial: 34,
};

const toSelectOptions = (list) => {
  return [...list].sort().map((value) => {
    return {
      label: value,
      value: value,
    };
  });
};

const onFinish = async ({
  values: {
    previous = [],
    remainingPron,
    baseProfit,
    strategy,
    startingSocial,
    ...misc
  },
  workerInstance,
  setLoading,
  setCombinationsCount,
  setProgress,
}) => {
  setLoading(true);

  const params = {
    previousInvestments: previous,
    money: remainingPron + baseProfit,
    social: strategy === 'social' ? 40 - startingSocial : 0,
    giviniStart: 17 + previous.includes("Min's Trade Route"),
    giviniExtra: 6, // FIXME Approximate for now for simplicity's sake, but this value is interconnected with social
    ...misc,
  };

  const combinationsCount = await workerInstance.prepare(params);
  setCombinationsCount(combinationsCount);
  setProgress(0);
  const batchSize = 10000;
  let result;
  for (let i = 0; i < Math.ceil(combinationsCount / batchSize); i++) {
    const end = Math.min((i + 1) * batchSize, combinationsCount);
    result = await workerInstance.process(i * batchSize, end);
    setProgress(end / combinationsCount);
  }

  console.log(result);

  setLoading(false);
  setCombinationsCount(undefined);
  setProgress(undefined);
};

const FirstRound = ({ workerInstance }) => {
  const [loading, setLoading] = useState(false);
  const [previous, setPrevious] = useState(initialValues.previous);
  const [strategy, setStrategy] = useState(initialValues.strategy);
  const [combinationsCount, setCombinationsCount] = useState();
  const [progress, setProgress] = useState();

  if (!workerInstance) {
    return null;
  }

  return (
    <>
      <Alert
        message={`Assumptions`}
        description={
          <>
            <span>{`This tool takes for granted that:`}</span>
            <ol>
              <li>{`The Succubus Tower were visited during chapter 1.`}</li>
              <li>{`Tradesmasher and the Succubus Armorer were met during chapter 3.`}</li>
              <li>{`New Givini Trade was bought at the end of chapter 3.`}</li>
              <li>{`Chapter 3 in general was good enough for Yhilin to reach its final state during the first investment phase of Chapter 4.`}</li>
            </ol>
          </>
        }
        type="info"
        showIcon
      />
      <Form
        initialValues={initialValues}
        onFinish={(values) => {
          onFinish({
            values,
            setLoading,
            setCombinationsCount,
            setProgress,
            workerInstance,
          });
        }}
        onValuesChange={(_, allValues) => {
          setPrevious(allValues.previous);
          setStrategy(allValues.strategy);
        }}
      >
        <Card title={`The past`}>
          <Form.Item
            label={`ProN remaining at the end of chapter 3`}
            name="remainingPron"
            tooltip={`In the Calculator, go to "War Investment Phase" and copy the value next to "ProN available".`}
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label={`Total profit at the start of chapter 4`}
            name="baseProfit"
            tooltip={`In the Calculator, go to "First Tower Run and Investment and copy the value next to "Total ProN Return".`}
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label={`Investments already bought during chapters 2/3`}
            name="previous"
          >
            <Select
              options={toSelectOptions(possiblePrevious)}
              mode="multiple"
            />
          </Form.Item>

          {!previous.includes('Yhilini Bank Core Lender') && (
            <Form.Item name="chapter1Bank" valuePropName="checked">
              <Checkbox>{`You invested 25000 in Yhilin Bank during chapter 1.`}</Checkbox>
            </Form.Item>
          )}
          {!previous.includes('Premium Steel Owner') && (
            <Form.Item name="chapter1Steel" valuePropName="checked">
              <Checkbox>{`You invested 20000 in Premium Steel during chapter 1.`}</Checkbox>
            </Form.Item>
          )}
        </Card>

        <Card title={`Strategy`}>
          <Form.Item name="strategy" label={`Choose your strategy`}>
            <Radio.Group
              options={[
                {
                  label: `Reach the threshold of 40 Social points in the most cost-effective way.`,
                  value: 'social',
                },
                {
                  label: `Focus solely on maximizing profits.`,
                  value: 'money',
                },
              ]}
            />
          </Form.Item>
          {strategy === 'social' && (
            <Form.Item
              label={`Your social standing at the start of chapter 4`}
              name="startingSocial"
              tooltip={`In the Calculator, go to "War Investment Phase" and copy the value next to "Social Score".`}
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
          )}
        </Card>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {`Submit`}
          </Button>
        </Form.Item>
      </Form>
      {loading && (
        <Card>
          {!!combinationsCount ? (
            <>
              <p>{`Processing ${combinationsCount.toLocaleString(
                'en-US'
              )} possibilities…`}</p>
              {progress !== undefined && (
                <Progress percent={Math.round(progress * 10000) / 100} />
              )}
            </>
          ) : (
            <>
              <p>{`Loading the loading bar…`}</p>
              <Spin />
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default FirstRound;
