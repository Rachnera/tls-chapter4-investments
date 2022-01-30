import { useEffect, useState } from 'react';
import {
  Form,
  Card,
  Radio,
  Select,
  Button,
  Alert,
  InputNumber,
  Divider,
} from 'antd';
import preGawnfallInvestments, {
  postGawnfallInvestments,
} from '../data/investments';
import Mandatory from '../components/form/Mandatory';
import Banned from '../components/form/Banned';
import { nF } from '../misc';
import Extra from '../components/form/Extra';

const initialValues = {
  mandatory1: ['Givini Tunnels'],
  yelarel: 'min',
  gawnfallTakkan: 'major',
  gawnfallMercantile: 'excellent',
  gawnfallArdford: 'resolved',
  gawnfallMother: 'full_unlock',
  vera: true,
  merchantSolution3: 'neutral',
  mandatory: [],
  banned: [],
  gawnfallHigh: 'herin_overwhelming',
  reserves: 5000000 + 125000 + 250000,
  extra_reserves: 0,
  spending: 0,
};

const WarInvestments = ({ purchased, frontName, investments }) => {
  const missing = investments.filter((inv) => !purchased.includes(inv));

  if (missing.length === 0) {
    return null;
  }

  return (
    <Alert
      message={
        <>
          {`You have yet to purchase the following investment${
            missing.length > 1 ? `s` : ''
          }, possibly relevant on the ${frontName} front of the upcoming Erosian War: `}
          <strong>{missing.join(', ')}</strong>
        </>
      }
      type="info"
      showIcon
      className="war-related-investments"
    />
  );
};

const GhenaleseWarInvestments = ({ purchased }) => {
  return (
    <WarInvestments
      purchased={purchased}
      frontName={`Ghenalese`}
      investments={[
        'Givini Mage Guild',
        'Mercenary Offices',
        'Stineford Succubus Tower',
        'War Monument',
      ]}
    />
  );
};

const ErosianWarInvestments = ({ purchased }) => {
  return (
    <WarInvestments
      purchased={purchased}
      frontName={`Erosian`}
      investments={[
        'Gasm Falls Orc Tunnels',
        'Gasm Falls Water Cleanup',
        'Lustlord Temples',
        'Orc Pools Upgrade',
        'Orcish Democracy',
        "Tarran'Kan Housing + Tarran'Kan Trade Upgrade",
      ]}
    />
  );
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

  useEffect(() => {
    form.setFieldsValue({
      mandatory1: form
        .getFieldValue('mandatory1')
        .filter((inv) => !previousInvestments.includes(inv)),
    });
  }, [form, previousInvestments]);

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
        setMandatory1(
          [
            ...allValues.mandatory1,
            allValues.yelarel === 'max' && 'Lustlord Temples',
          ].filter(Boolean)
        );
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
      <Card title={`Gawnfall`} type="inner" className="gawnfall">
        <div className="two-columns">
          <Card title={`Strategy`} type="inner">
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
                <Select
                  options={[
                    {
                      value: 'none',
                      label: `Don't invest in the Lustlord cult`,
                    },
                    {
                      value: 'min',
                      label: `Pay ${nF(50000)} ProN for New Lustlord Statues`,
                    },
                    {
                      value: 'max',
                      label: `Invest a total of ${nF(
                        800000
                      )} ProN in the Lustlord Temples`,
                    },
                  ]}
                />
              </Form.Item>
            )}
            <Form.Item
              label={`Buy the Goddess of Magic Statue for ${nF(10000)} ProN?`}
              name="vera"
            >
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
              label={`Other investments you wish to do before the Council`}
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
          <Card title={`Investments-related results`} type="inner">
            <Alert
              message={`Only the Succubi Accepted path is supported as of now.`}
              type="warning"
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
        </div>
      </Card>
      <Card title={`Post Gawnfall`} type="inner">
        <div className="reserves">
          <Form.Item
            label={`Keep enough cash in reserve, if need be, to:`}
            name="reserves"
          >
            <Select
              options={[
                {
                  label: `Open the ruins after the war`,
                  value: 0,
                },
                {
                  label: `Open the ruins before the war (${nF(5000000)} ProN)`,
                  value: 5000000,
                },
                {
                  label: `Open the ruins and buy everything but the Smithing in Kyangan (${nF(
                    5000000 + 125000
                  )} ProN)`,
                  value: 5000000 + 125000,
                },
                {
                  label: `Open the ruins and buy everything in Kyangan (${nF(
                    5000000 + 125000 + 250000
                  )} ProN)`,
                  value: 5000000 + 125000 + 250000,
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={`Also make sure to have the additional amount available`}
            name="extra_reserves"
            tooltip={
              <>
                {`For extra expanses not covered in the previous option.`}
                <br />
                {`For example, if you also plan to buy Armory Upgrade and Entity's Shield Upgrade before the war, enter their total cost i.e. 260000.`}
              </>
            }
          >
            <InputNumber />
          </Form.Item>
        </div>
        <Divider />
        <Mandatory
          form={form}
          purchased={[
            ...previousInvestments,
            ...mandatory1,
            ...lockedInvestments,
          ]}
          list="gawnfall"
        />
        <GhenaleseWarInvestments
          purchased={[
            ...previousInvestments,
            ...mandatory1,
            ...mandatory,
            ...lockedInvestments,
          ]}
        />
        <ErosianWarInvestments
          purchased={[
            ...previousInvestments,
            ...mandatory1,
            ...mandatory,
            ...lockedInvestments,
          ]}
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
        <Extra />
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
