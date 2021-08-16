import { Form, Select, InputNumber, Button } from 'antd';
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
];

const defaultPrevious = [
  "Min's Trade Route",
  'Yhilini Succubi Trade',
  'Eustrin Guild',
];

const toSelectOptions = (list) => {
  return [...list].sort().map((value) => {
    return {
      label: value,
      value: value,
    };
  });
};

const onFinish = async (
  { previous = [], social = 0, remainingPron, baseProfit },
  callback
) => {
  const params = {
    previousInvestments: previous,
    money: remainingPron + baseProfit,
    social,
    giviniStart: 17 + previous.includes("Min's Trade Route"),
    giviniExtra: 6, // FIXME Approximate for now for simplicity's sake, but this value is interconnected with social
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

  const callback = (result) => {
    console.log(result);
    setLoading(false);
  };

  return (
    <Form
      initialValues={{
        previous: defaultPrevious,
        remainingPron: 5000,
        baseProfit: 2000000,
      }}
      onFinish={(values) => {
        setLoading(true);
        onFinish(values, callback);
      }}
    >
      <Form.Item label={`I already own`} name="previous">
        <Select options={toSelectOptions(possiblePrevious)} mode="multiple" />
      </Form.Item>
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
        label={`How many social points you wish to earn (at least) from investments`}
        name="social"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {`Submit`}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FirstRound;
