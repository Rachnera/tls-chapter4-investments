import {
  Form,
  Select,
  InputNumber,
  Button,
  Card,
  Checkbox,
  Radio,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import allInvestments from '../data/investments';
import Banned from '../components/form/Banned';

const { Title } = Typography;

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
  'Ivalan Bank',
  'Mercenary Flotilla',
  'Sanitation Mages Guild',
  'Crystal Refiner',
  'Ardford Restaurant',
];

const initialValues = {
  previous: [
    'Premium Steel Owner',
    "Min's Trade Route",
    'Yhilini Succubi Trade',
    'Eustrin Guild',
    'Denmiel Mushrooms',
    'Ivalan Bank',
    'Crystal Refiner',
    'Ardford Restaurant',
  ],
  remainingPron: 7500,
  baseProfit: 2435000,
  chapter1Steel: false,
  strategy: 'money',
  startingSocial: 34,
  chapter3Infrastructure: true,
  merchantSolution: 'wait',
  jhenno: 'religion',
  magicalItems: 'givini',
  mandatory: ['Givini Orc Merchant', 'Bank of Givini'],
  research: 'orc',
  banned: [],
};

const toSelectOptions = (list) => {
  return [...list].sort().map((value) => {
    return {
      label: value,
      value: value,
    };
  });
};

const requiredRule = { required: true, message: `Please provide a value.` };

const CustomForm = ({ onFinish, loading }) => {
  const [form] = Form.useForm();

  const [previous, setPrevious] = useState(initialValues.previous);
  const [mandatory, setMandatory] = useState(initialValues.mandatory);
  const [merchantSolution, setMerchantSolution] = useState(
    initialValues.merchantSolution
  );

  useEffect(() => {
    if (
      merchantSolution === 'neutral' &&
      form.getFieldValue('strategy') === 'money'
    ) {
      form.setFieldsValue({ strategy: 'social' });
    }
  }, [form, merchantSolution]);

  useEffect(() => {
    form.setFieldsValue({
      mandatory: form
        .getFieldValue('mandatory')
        .filter((name) => !previous.includes(name)),
    });
  }, [form, previous]);

  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      onValuesChange={(_, allValues) => {
        setPrevious(allValues.previous);
        setMerchantSolution(allValues.merchantSolution);
        setMandatory(allValues.mandatory);
      }}
      className="round-form first-round-form"
      form={form}
    >
      <div className="past-block">
        <Title level={2}>{`Chapters 1-3`}</Title>
        <Card>
          <div className="numbers">
            <Form.Item
              label={`ProN remaining at the end of chapter 3`}
              name="remainingPron"
              tooltip={`In the Calculator, go to "War Investment Phase" and copy the value next to "ProN available".`}
              rules={[requiredRule]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label={`Total profit at the start of chapter 4`}
              name="baseProfit"
              tooltip={`In the Calculator, go to "First Tower Run and Investment and copy the value next to "Total ProN Return".`}
              rules={[requiredRule]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label={`Your social standing at the start of chapter 4`}
              name="startingSocial"
              tooltip={`In the Calculator, go to "War Investment Phase" and copy the value next to "Social Score".`}
              rules={[requiredRule]}
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
      </div>

      <Title level={2}>{`Chapter 4 – Round 1`}</Title>
      <Card title={`Strategy`}>
        <Form.Item name="strategy" label={`Succession crisis`}>
          <Radio.Group
            options={[
              {
                label: `Focus on profits; do only the bare minimum for the Ardan succession crisis (New Givini ≥ 25).`,
                value: 'money',
                disabled: merchantSolution === 'neutral',
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
        <div className="selects">
          <Form.Item label={`Research`} name="research">
            <Select
              options={[
                {
                  value: 'orc',
                  label: `Orc Diversification`,
                },
                {
                  value: 'unpeople',
                  label: `Unpeople Transformation`,
                },
                {
                  value: 'purity',
                  label: `Purity Magic`,
                },
                {
                  value: 'defense',
                  label: `Base Defense`,
                },
              ]}
            />
          </Form.Item>
          <Form.Item label={`Jhenno's cooperation`} name="jhenno">
            <Select
              options={[
                {
                  value: 'politics',
                  label: `Politics`,
                },
                {
                  value: 'religion',
                  label: `Religion`,
                },
              ]}
            />
          </Form.Item>
          <Form.Item label={`Rose's house magical items`} name="magicalItems">
            <Select
              options={[
                {
                  value: 'givini',
                  label: `Givini`,
                },
                {
                  value: 'takkan',
                  label: `Tak'Kan`,
                },
              ]}
            />
          </Form.Item>
          <Form.Item label={`Merchant dispute`} name="merchantSolution">
            <Select
              options={[
                {
                  value: 'neutral',
                  label: `Neutral compromise (force Social ≥ 40)`,
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
        </div>

        <Form.Item
          label={`Investments you explicitly want to buy, for any reason`}
          name="mandatory"
          tooltip={`Forcing a few certain investments can improve performances tremendously.`}
        >
          <Select
            options={toSelectOptions(
              allInvestments
                .map(({ name }) => name)
                .filter((name) => !previous.includes(name))
            )}
            mode="multiple"
          />
        </Form.Item>
        <Banned purchased={[...previous, ...mandatory]} form={form} />

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {`Submit`}
          </Button>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default CustomForm;
