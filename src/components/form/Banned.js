import Select from './Select';

const Banned = ({ purchased, form }) => {
  return (
    <Select
      form={form}
      purchased={purchased}
      label={`Investments you explicitly refuse to buy, for any reason`}
      name="banned"
      tooltip={`For cases where a particular investment might be more of a curse than a blessing in the long run and you want to see what happens without it`}
    />
  );
};

export default Banned;
