import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

type InputCpfProps = {
  value?: string,
  label?: string,
  error?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

function CpfInput({ label, value, error, onChange }: InputCpfProps) {
  return (
    <InputMask
      mask="999.999.999-99"
      maskPlaceholder=""
      value={value}
      onChange={onChange}
    >
      <TextField
        label={label}
        size="small"
        type="text"
        required
        error={error}
        sx={{
          flexGrow: 1
        }}
      />
    </InputMask>
  );
}

export default CpfInput;