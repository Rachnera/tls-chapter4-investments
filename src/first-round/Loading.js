import { Card, Spin, Progress } from 'antd';

const Loading = ({ combinationsCount, progress }) => {
  return (
    <Card>
      {!!combinationsCount ? (
        <>
          <p>{`Processing ${combinationsCount.toLocaleString(
            'en-US'
          )} possibilities…`}</p>
          {progress !== undefined && (
            <Progress percent={Math.round(progress * 10000) / 100} />
          )}
        </>
      ) : (
        <>
          <p>{`Loading the loading bar…`}</p>
          <Spin />
        </>
      )}
    </Card>
  );
};

export default Loading;
