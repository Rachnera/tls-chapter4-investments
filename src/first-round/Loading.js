import { Card, Progress, Divider } from 'antd';

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
    <Card>
      <div>
        <p>{`Prefiltering 2^${investmentsCount}: ${(
          2 ** investmentsCount
        ).toLocaleString('en-US')} possibilities…`}</p>
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
    </Card>
  );
};

export default Loading;
