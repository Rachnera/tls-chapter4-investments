import { Form, Card, Radio, Select } from 'antd';
import preGawnfallInvestments from '../data/investments';

const initialValues = {
  yelarel: 'min',
  takkan: 'major',
  mercantile: 'excellent',
  ardford: 'resolved',
  mother: 'full_unlock',
};

const CustomForm = ({ previousInvestments, previousResearch }) => {
  return (
    <Form initialValues={initialValues} className="round-form third-round-form">
      <Card title={`Gawnfall – Stategy`} type="inner">
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
            ].filter(({ value }) => !previousResearch.includes(value))}
          />
        </Form.Item>
        {!previousInvestments.includes('Lustlord Temples') && (
          <Form.Item label={`Yelarel-related investments`} name="yelarel">
            <Radio.Group
              options={[
                {
                  value: 'min',
                  label: `Pay 50,000 for New Lustlord Statues`,
                },
                {
                  value: 'max',
                  label: `Invest 800,000 (total) in the Lustlord Temples`,
                },
              ]}
            />
          </Form.Item>
        )}
        <Form.Item
          label={`All investments you wish to do before the Council (example: Givini Tunnels)`}
          name="mandatory1"
        >
          <Select
            options={preGawnfallInvestments
              .filter(
                ({ name }) =>
                  !previousInvestments.includes(name) &&
                  'Lustlord Temples' !== name
              )
              .map(({ name }) => {
                return { label: name, value: name };
              })}
            mode="multiple"
          />
        </Form.Item>
      </Card>
      <Card title={`Gawnfall – Investment-relevant results`} type="inner">
        <Form.Item label={`Support for Tak'Kan`} name="takkan">
          <Select
            options={[
              {
                value: 'major',
                label: `Major`,
              },
              {
                value: 'minor',
                label: `Minor`,
              },
              {
                value: 'none',
                label: `None`,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={`Mercantile issue resolution`} name="mercantile">
          <Select
            options={[
              {
                value: 'excellent',
                label: `Excellent (5+)`,
              },
              {
                value: 'good',
                label: `Good (3-4)`,
              },
              {
                value: 'fair',
                label: `Fair (1-2)`,
              },
              {
                value: 'poor',
                label: `Poor (0)`,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={`Ardford's ban`} name="ardford">
          <Select
            options={[
              {
                value: 'overkill',
                label: `Lifted, with an extra bit of acceptance (5+)`,
              },
              {
                value: 'resolved',
                label: `Lifted (2-4)`,
              },
              {
                value: 'unresolved',
                label: `Unsolved (1-)`,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={`Mother's Guard`} name="mother">
          <Select
            options={[
              {
                value: 'full_unlock',
                label: `Crushed (6+)`,
              },
              {
                value: 'partial_unlock',
                label: `Dealt with (3-5)`,
              },
              {
                value: 'locked',
                label: `Unrestrained (2-)`,
              },
            ]}
          />
        </Form.Item>
      </Card>
    </Form>
  );
};

export default CustomForm;
