import Select from './Select';

const Mandatory = ({ form, purchased, tooltip, label, list }) => {
  return (
    <Select
      name="mandatory"
      form={form}
      purchased={purchased}
      label={label || `Investments you explicitly want to buy, for any reason`}
      tooltip={tooltip}
      list={list}
    />
  );
};

export default Mandatory;
