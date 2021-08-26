import { Form, Button, Card, Select } from 'antd';

const initialValues = {
  merchantSolution2: 'neutral',
};

const CustomForm = ({ onFinish, loading, firstRoundDecisions }) => {
  return (
    <Card title={`Round two`}>
      <Form
        initialValues={initialValues}
        onFinish={onFinish}
        className="second-round-form"
      >
        {firstRoundDecisions.merchantSolution === 'wait' && (
          <Form.Item label={`Merchant dispute`} name="merchantSolution2">
            <Select
              options={[
                {
                  value: 'neutral',
                  label: `Neutral compromise`,
                },
                {
                  value: 'givini',
                  label: `Favor New Givini`,
                },
              ]}
            />
          </Form.Item>
        )}

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
