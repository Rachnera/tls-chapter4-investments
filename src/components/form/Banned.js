import Select from './Select';

const Banned = ({ purchased, form, list, tooltip }) => {
  return (
    <Select
      form={form}
      purchased={purchased}
      label={`Investments you explicitly refuse to buy, for any reason`}
      name="banned"
      tooltip={tooltip}
      list={list}
    />
  );
};

export default Banned;
