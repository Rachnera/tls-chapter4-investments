import { Progress, Divider, Modal, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

const Loading = ({
  combinationsCount,
  progress,
  investmentsCount,
  preprogress,
  abort,
}) => {
  if (!investmentsCount) {
    return null;
  }

  return (
    <Modal visible={true} centered={true} closable={false} footer={null}>
      <div>
        <p>
          {`Prefiltering ${(2 ** investmentsCount).toLocaleString('en-US')} (2`}
          <sup>{investmentsCount}</sup>
          {`) possibilities…`}
        </p>
        <Progress percent={Math.round(preprogress * 100)} />
      </div>
      {!!combinationsCount && (
        <>
          <Divider />
          <div>
            <p>{`Processing ${combinationsCount.toLocaleString(
              'en-US'
            )} remaining possibilities…`}</p>
            <Progress percent={Math.round(progress * 10000) / 100} />
          </div>
        </>
      )}
      <Button
        danger={true}
        icon={<PoweroffOutlined />}
        onClick={abort}
        className="abort-button"
      >{`Abort`}</Button>
    </Modal>
  );
};

export default Loading;
