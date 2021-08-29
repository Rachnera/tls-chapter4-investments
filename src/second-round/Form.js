import { useState } from 'react';
import { Form, Button, Card, Select } from 'antd';
import Headquarters, { price as headquartersPrice } from './Headquarters';
import { nF } from '../misc';
import allInvestments from '../data/investments';

const initialValues = {
  merchantSolution2: 'neutral',
  headquarters: 'enough',
  orcCouncil: 0.8,
  mandatory: [],
};

const CustomForm = ({
  onFinish,
  loading,
  firstRoundDecisions,
  purchasedInvestments,
}) => {
  const [militaryExtra, setMilitaryExtra] = useState(
    initialValues.headquarters === 'extra'
  );

  const [form] = Form.useForm();

  const previousResearch = firstRoundDecisions.research;

  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      className="round-form second-round-form"
      form={form}
      onValuesChange={(_, allValues) => {
        setMilitaryExtra(allValues.headquarters === 'extra');
      }}
    >
      <Card title={`Stategy`} type="inner">
        <div className="two-columns">
          <div>
            {firstRoundDecisions.merchantSolution === 'wait' && (
              <Form.Item label={`Merchant dispute`} name="merchantSolution2">
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
            )}
            <Form.Item name="orcCouncil" label={`Orc council`}>
              <Select
                options={[
                  {
                    label: `Substantial majority (≥ 65%)`,
                    value: 0.65,
                  },
                  {
                    label: `Overwhelming majority (≥ 80%)`,
                    value: 0.8,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item name="headquarters" label={`Headquarters`}>
              <Select
                options={[
                  {
                    label: `Pay ${nF(
                      headquartersPrice({ research: previousResearch })
                    )} for strong magical defenses.`,
                    value: 'enough',
                  },
                  {
                    label: `Pay ${nF(
                      headquartersPrice({
                        research: previousResearch,
                        extra: true,
                      })
                    )} for strong magical and military defenses.`,
                    value: 'extra',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={`Investments you explicitly want to buy now (example: Airships)`}
              name="mandatory"
            >
              <Select
                options={allInvestments
                  .filter(({ name }) => !purchasedInvestments.includes(name))
                  .map(({ name }) => {
                    return { label: name, value: name };
                  })}
                mode="multiple"
              />
            </Form.Item>
          </div>
          <Headquarters research={previousResearch} extra={militaryExtra} />
        </div>

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
