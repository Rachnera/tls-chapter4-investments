import { Form, InputNumber } from 'antd';

const Extra = ({ tooltip }) => {
  return (
    <Form.Item label={`Other spending`} name="spending" tooltip={tooltip}>
      <InputNumber />
    </Form.Item>
  );
};

export default Extra;
