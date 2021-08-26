const Addition = ({ startingValue = 0, dataSources }) => {
  return (
    <table className="addition">
      <tbody>
        <tr>
          <td>{`Initial value`}</td>
          <td>{startingValue}</td>
          <td></td>
        </tr>
      </tbody>
      {dataSources
        .filter(({ dataSource }) => dataSource.length > 0)
        .map(({ title, dataSource }, index) => {
          return (
            <tbody key={index.toString()}>
              <tr>
                <th colSpan="3" scope="col">
                  {title}
                </th>
              </tr>
              {dataSource.map(({ label, values, explanation }, index) => {
                return (
                  <tr key={index.toString()}>
                    <td>{label}</td>
                    <td>{values.map((value) => `+${value}`).join(' ')}</td>
                    <td>{explanation}</td>
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      <tfoot>
        <tr>
          <th scope="row">{`Total`}</th>
          <td>
            {startingValue +
              dataSources.reduce(
                (acc, { dataSource }) =>
                  acc +
                  dataSource.reduce(
                    (acc, { values }) =>
                      acc + values.reduce((acc, val) => acc + val),
                    0
                  ),
                0
              )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Addition;
