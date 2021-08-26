import { Form, Button, Card } from 'antd';

const initialValues = {};

const CustomForm = ({ onFinish, loading }) => {
  return (
    <Card title={`Round two`}>
      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        className="second-round-form"
      >
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
