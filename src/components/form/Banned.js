import { Form, Select } from 'antd';
import allInvestments from '../../data/investments';
import { useEffect } from 'react';

const CustomForm = ({ purchased, form }) => {
  useEffect(() => {
    form.setFieldsValue({
      banned: form
        .getFieldValue('banned')
        .filter((name) => !purchased.includes(name)),
    });
  }, [form, purchased]);

  return (
    <Form.Item
      label={`Investments you explicitly refuse to buy, for any reason`}
      name="banned"
      tooltip={`For cases where a particular investment might be more of a curse than a blessing in the long run and you want to see what happens without it`}
    >
      <Select
        options={[...allInvestments]
          .filter(({ name }) => !purchased.includes(name))
          .sort(({ name: a }, { name: b }) => a.localeCompare(b))
          .map(({ name }) => {
            return {
              label: name,
              value: name,
            };
          })}
        mode="multiple"
      />
    </Form.Item>
  );
};

export default CustomForm;
