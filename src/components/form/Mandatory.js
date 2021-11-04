import Select from './Select';

const Mandatory = ({ form, purchased, tooltip, label }) => {
  return (
    <Select
      name="mandatory"
      form={form}
      purchased={purchased}
      label={label || `Investments you explicitly want to buy, for any reason`}
      tooltip={tooltip}
    />
  );
};

export default Mandatory;
