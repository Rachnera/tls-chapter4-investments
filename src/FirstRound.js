import { Form, Select, InputNumber, Button, Card, Checkbox, Radio } from 'antd';
import { useState, useEffect } from 'react';
import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax

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

const onFinish = async (
  {
    previous = [],
    remainingPron,
    baseProfit,
    chapter1Bank,
    chapter1Steel,
    strategy,
    startingSocial,
  },
  callback
) => {
  const params = {
    previousInvestments: previous,
    money: remainingPron + baseProfit,
    social: strategy === 'social' ? 40 - startingSocial : 0,
    giviniStart: 17 + previous.includes("Min's Trade Route"),
    giviniExtra: 6, // FIXME Approximate for now for simplicity's sake, but this value is interconnected with social
    chapter1Bank,
    chapter1Steel,
  };
  const result = await workerInstance.optimalInvestments(params);
  callback(result);
};

let workerInstance;

const FirstRound = () => {
  useEffect(() => {
    workerInstance = worker();

    return () => {
      workerInstance.terminate();
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [previous, setPrevious] = useState(initialValues.previous);
  const [strategy, setStrategy] = useState(initialValues.strategy);

  const callback = (result) => {
    console.log(result);
    setLoading(false);
  };

  return (
    <Form
      initialValues={initialValues}
      onFinish={(values) => {
        setLoading(true);
        onFinish(values, callback);
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
          <Select options={toSelectOptions(possiblePrevious)} mode="multiple" />
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
              { label: `Focus solely on maximizing profits.`, value: 'money' },
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
  );
};

export default FirstRound;
