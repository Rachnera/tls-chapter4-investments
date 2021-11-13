import { Form, InputNumber } from 'antd';

const Extra = () => {
  return (
    <Form.Item
      label={`Other spending`}
      name="spending"
      tooltip={`Money to be spent on investments not listed elsewhere, like headquarters upgrades.`}
    >
      <InputNumber />
    </Form.Item>
  );
};

export default Extra;
