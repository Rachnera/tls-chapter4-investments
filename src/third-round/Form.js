import { useEffect, useState } from 'react';
import { Form, Card, Radio, Select, Button, Alert } from 'antd';
import preGawnfallInvestments, {
  postGawnfallInvestments,
} from '../data/investments';
import Mandatory from '../components/form/Mandatory';
import Banned from '../components/form/Banned';

const initialValues = {
  mandatory1: [],
  yelarel: 'min',
  gawnfallTakkan: 'major',
  gawnfallMercantile: 'excellent',
  gawnfallArdford: 'resolved',
  gawnfallMother: 'full_unlock',
  vera: false,
  merchantSolution3: 'neutral',
  mandatory: [],
  banned: [],
  gawnfallHigh: 'herin_overwhelming',
};

const CustomForm = ({
  previousInvestments,
  previousResearch,
  onFinish,
  loading,
  merchantSolution,
}) => {
  const [form] = Form.useForm();
  const [mandatory1, setMandatory1] = useState(initialValues.mandatory1);
  const [mandatory, setMandatory] = useState(initialValues.mandatory);
  const [lockedInvestments, setLockedInvestments] = useState([]);

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
      onValuesChange={(_, allValues) => {
        setMandatory1(allValues.mandatory1);
        setMandatory(allValues.mandatory);
        setLockedInvestments(
          postGawnfallInvestments
            .filter(({ name, price }) => {
              if (previousInvestments.includes(name)) {
                return false;
              }
              if (typeof price !== 'function') {
                return false;
              }
              return price(allValues) === Infinity;
            })
            .map(({ name }) => name)
        );
      }}
    >
      <Card title={`Gawnfall – Stategy`} type="inner">
        {!merchantSolution && (
          <Form.Item label={`Merchant dispute`} name="merchantSolution3">
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
        <Form.Item label={`Promotion vote`} name="gawnfallHigh">
          <Select
            options={[
              {
                value: 'herin_overwhelming',
                label: `Overwhelming victory for Herin`,
              },
              {
                value: 'herin_promoted',
                label: `Herin promoted`,
              },
              {
                value: 'kaskia_promoted',
                label: `Kaskia promoted`,
              },
              {
                value: 'kaskia_overwhelming',
                label: `Overwhelming victory for Kaskia`,
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

      <Card title={`Post Gawnfall`} type="inner">
        <Mandatory
          form={form}
          purchased={[
            ...previousInvestments,
            ...mandatory1,
            ...lockedInvestments,
          ]}
          list="gawnfall"
        />
        <Banned
          form={form}
          purchased={[
            ...previousInvestments,
            ...mandatory1,
            ...mandatory,
            ...lockedInvestments,
          ]}
          list="gawnfall"
        />
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
