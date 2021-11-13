import { useState, useEffect } from 'react';
import { Form, Button, Card, Select } from 'antd';
import Headquarters, { price as headquartersPrice } from './Headquarters';
import { nF } from '../misc';
import Banned from '../components/form/Banned';
import Mandatory from '../components/form/Mandatory';
import Extra from '../components/form/Extra';

const initialValues = {
  merchantSolution2: 'neutral',
  headquarters: '20/10',
  orcCouncil: 0.8,
  mandatory: [],
  banned: [],
  spending: 0,
};

const CustomForm = ({
  onFinish,
  loading,
  firstRoundDecisions,
  purchasedInvestments,
}) => {
  const [form] = Form.useForm();

  const [hq, setHq] = useState(initialValues.headquarters);
  const [military, magic] = hq.split('/').map((x) => parseInt(x));
  const [mandatory, setMandatory] = useState(initialValues.mandatory);

  const previousResearch = firstRoundDecisions.research;
  useEffect(() => {
    form.setFieldsValue({
      research: previousResearch === 'purity' ? 'orc' : 'purity',
    });
  }, [form, previousResearch]);

  return (
    <Form
      initialValues={initialValues}
      onFinish={onFinish}
      className="round-form second-round-form"
      form={form}
      onValuesChange={(_, allValues) => {
        setHq(allValues.headquarters);
        setMandatory(allValues.mandatory);
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
                      headquartersPrice({
                        research: previousResearch,
                        military: 20,
                        magic: 10,
                      })
                    )} ProN for Military ≥ 20, Magic ≥ 10.`,
                    value: '20/10',
                  },
                  {
                    label: `Pay ${nF(
                      headquartersPrice({
                        research: previousResearch,
                        military: 5,
                        magic: 20,
                      })
                    )} ProN for Military ≥ 5, Magic ≥ 20.`,
                    value: '5/20',
                  },
                  {
                    label: `Pay ${nF(
                      headquartersPrice({
                        research: previousResearch,
                        military: 20,
                        magic: 20,
                      })
                    )} ProN for Military ≥ 20, Magic ≥ 20.`,
                    value: '20/20',
                  },
                ]}
              />
            </Form.Item>
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
                ].filter(({ value }) => value !== previousResearch)}
              />
            </Form.Item>
            <Mandatory
              label={`Investments you explicitly want to buy now (example: Airships)`}
              form={form}
              purchased={purchasedInvestments}
            />
            <Banned
              purchased={[...purchasedInvestments, ...mandatory]}
              form={form}
            />
            <Extra />
          </div>
          <Headquarters
            research={previousResearch}
            military={military}
            magic={magic}
          />
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
