import { Form, Select, InputNumber, Button, Card, Checkbox, Radio } from 'antd';
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
  chapter3Infrastructure: true,
  merchantSolution: 'neutral',
};

const toSelectOptions = (list) => {
  return [...list].sort().map((value) => {
    return {
      label: value,
      value: value,
    };
  });
};

const CustomForm = ({ onFinish, loading }) => {
  const [previous, setPrevious] = useState(initialValues.previous);

  return (
    <Card title={`Round one`}>
      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        onValuesChange={(_, allValues) => {
          setPrevious(allValues.previous);
        }}
        className="first-round-form"
      >
        <Card title={`The past`} type="inner">
          <div className="numbers">
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
              label={`Your social standing at the start of chapter 4`}
              name="startingSocial"
              tooltip={`In the Calculator, go to "War Investment Phase" and copy the value next to "Social Score".`}
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
          </div>

          <Form.Item
            label={`Investments already bought during chapters 2/3`}
            name="previous"
          >
            <Select
              options={toSelectOptions(possiblePrevious)}
              mode="multiple"
            />
          </Form.Item>

          <div className="checkboxes">
            {!previous.includes('Yhilini Bank Core Lender') && (
              <Form.Item name="chapter1Bank" valuePropName="checked">
                <Checkbox>{`You invested 25,000 ProN in the Yhilin Bank during chapter 1.`}</Checkbox>
              </Form.Item>
            )}
            {!previous.includes('Premium Steel Owner') && (
              <Form.Item name="chapter1Steel" valuePropName="checked">
                <Checkbox>{`You invested 20,000 ProN in Premium Steel during chapter 1.`}</Checkbox>
              </Form.Item>
            )}
            {!(
              previous.includes('Yhilini Succubi Trade') &&
              previous.includes('Mercenary Offices')
            ) && (
              <Form.Item name="chapter3Infrastructure" valuePropName="checked">
                <Checkbox>{`You funded Yhilin Infrastructure during chapter 3.`}</Checkbox>
              </Form.Item>
            )}
          </div>
        </Card>

        <Card title={`Strategy`} type="inner">
          <Form.Item name="strategy" label={`Main strategy`}>
            <Radio.Group
              options={[
                {
                  label: `Focus on profits; do only the bare minimum for the Ardan succession crisis (New Givini ≥ 25).`,
                  value: 'money',
                },
                {
                  label: `Mix profits and social; reach most thresholds for the Ardan succession crisis (New Givini ≥ 25, Social ≥ 40).`,
                  value: 'social',
                },
                {
                  label: `Go all in on the Ardan succession crisis (New Givini ≥ 25, Social ≥ 40, dedicated investments).`,
                  value: 'succession',
                },
              ]}
            />
          </Form.Item>
          <Form.Item label={`Merchant dispute`} name="merchantSolution">
            <Select
              options={[
                {
                  value: 'neutral',
                  label: `Neutral compromise`,
                },
                {
                  value: 'givini',
                  label: `Favor New Givini`,
                },
                {
                  value: 'wait',
                  label: `Wait`,
                },
              ]}
            />
          </Form.Item>
        </Card>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {`Submit`}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CustomForm;
