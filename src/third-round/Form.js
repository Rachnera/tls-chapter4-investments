import { useEffect } from 'react';
import { Form, Card, Radio, Select, Button, Alert } from 'antd';
import preGawnfallInvestments from '../data/investments';

const initialValues = {
  mandatory1: [],
  yelarel: 'min',
  gawnfallTakkan: 'major',
  gawnfallMercantile: 'excellent',
  gawnfallArdford: 'resolved',
  gawnfallMother: 'full_unlock',
  vera: false,
};

const CustomForm = ({
  previousInvestments,
  previousResearch,
  onFinish,
  loading,
}) => {
  const [form] = Form.useForm();

  const availableResearch = [
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
  ].filter(({ value }) => !previousResearch.includes(value));
  useEffect(() => {
    form.setFieldsValue({
      research: availableResearch[0]['value'],
    });
  }, [form, availableResearch]);

  return (
    <Form
      initialValues={initialValues}
      className="round-form third-round-form"
      form={form}
      onFinish={onFinish}
    >
      <Card title={`Gawnfall – Stategy`} type="inner">
        <Form.Item label={`Research`} name="research">
          <Select options={availableResearch} />
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
        <Form.Item label={`Buy Goddess of Magic Statue?`} name="vera">
          <Radio.Group
            options={[
              {
                value: true,
                label: `Yes`,
              },
              {
                value: false,
                label: `No`,
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label={`Other investments you wish to do before the Council (example: Givini Tunnels)`}
          name="mandatory1"
        >
          <Select
            options={preGawnfallInvestments
              .filter(
                ({ name }) =>
                  !previousInvestments.includes(name) &&
                  'Lustlord Temples' !== name &&
                  // FIXME: Removing investments whose price can change from the list for now
                  // Should be handled for real later
                  ![
                    'Denmiel Archives',
                    "Tarran'Kan Housing + Tarran'Kan Trade Upgrade",
                  ].includes(name)
              )
              .map(({ name }) => {
                return { label: name, value: name };
              })}
            mode="multiple"
          />
        </Form.Item>
      </Card>
      <Card title={`Gawnfall – Investment-relevant results`} type="inner">
        <Alert
          message={`Assuming the council will go the Succubi Accepted path for now`}
          type="info"
          showIcon
        />
        <Form.Item label={`Support for Tak'Kan`} name="gawnfallTakkan">
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
        <Form.Item
          label={`Mercantile issue resolution`}
          name="gawnfallMercantile"
        >
          <Select
            options={[
              {
                value: 'excellent',
                label: `Excellent`,
              },
              {
                value: 'good',
                label: `Good`,
              },
              {
                value: 'fair',
                label: `Fair`,
              },
              {
                value: 'poor',
                label: `Poor`,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={`Ardford's ban`} name="gawnfallArdford">
          <Select
            options={[
              {
                value: 'overkill',
                label: `Lifted, with an extra bit of acceptance`,
              },
              {
                value: 'resolved',
                label: `Lifted`,
              },
              {
                value: 'unresolved',
                label: `Unsolved`,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label={`Mother's Guard`} name="gawnfallMother">
          <Select
            options={[
              {
                value: 'full_unlock',
                label: `Crushed`,
              },
              {
                value: 'partial_unlock',
                label: `Dealt with`,
              },
              {
                value: 'locked',
                label: `Unrestrained`,
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
  );
};

export default CustomForm;
