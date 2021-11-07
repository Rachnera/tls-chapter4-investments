import { Form, Select } from 'antd';
import { getInvestments } from '../../data/investments';
import { useEffect } from 'react';

const CustomSelect = ({ name, label, tooltip, purchased, form, list }) => {
  useEffect(() => {
    form.setFieldsValue({
      [name]: form
        .getFieldValue(name)
        .filter((inv) => !purchased.includes(inv)),
    });
  }, [form, purchased, name]);

  return (
    <Form.Item label={label} name={name} tooltip={tooltip}>
      <Select
        options={getInvestments(list)
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

export default CustomSelect;
