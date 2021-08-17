import { Progress, Divider, Modal } from 'antd';

const Loading = ({
  combinationsCount,
  progress,
  investmentsCount,
  preprogress,
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
    </Modal>
  );
};

export default Loading;
