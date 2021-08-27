import { useState } from 'react';
import { Form, Button, Card, Select, Radio } from 'antd';
import Headquarters, { price as headquartersPrice } from './Headquarters';
import { nF } from '../misc';

const initialValues = {
  merchantSolution2: 'neutral',
  headquarters: 'enough',
};

const CustomForm = ({ onFinish, loading, firstRoundDecisions }) => {
  const [militaryExtra, setMilitaryExtra] = useState(
    initialValues.headquarters === 'extra'
  );

  const [form] = Form.useForm();

  const previousResearch = firstRoundDecisions.research;

  return (
    <Card title={`Round two`}>
      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        className="second-round-form"
        form={form}
        onValuesChange={(_, allValues) => {
          setMilitaryExtra(allValues.headquarters === 'extra');
        }}
      >
        {firstRoundDecisions.merchantSolution === 'wait' && (
          <Card title={`Pending`} type="inner">
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
          </Card>
        )}

        <Card title={`Headquarters`} type="inner">
          <Form.Item name="headquarters" label={`Headquarters strategy`}>
            <Radio.Group
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
                  )} for strong magical defenses and military defenses.`,
                  value: 'extra',
                },
              ]}
            />
          </Form.Item>
          <Headquarters research={previousResearch} extra={militaryExtra} />
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
