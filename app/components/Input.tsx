import { Box, TextField, Text } from "@radix-ui/themes";

type InputProps = {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password?: boolean;
  number?: boolean;
};

const Input = (props: InputProps) => {
  const { label, placeholder, name, value, onChange, password, number } = props;
  return (
    <Box>
      <Text size="2" color="gray">
        {label}
      </Text>
      <TextField.Input
        radius="large"
        placeholder={placeholder}
        type={password ? "password" : number ? "number" : "text"}
        name={name}
        value={value}
        onChange={onChange}
        required
        mt="1"
      />
    </Box>
  );
};

export default Input;
