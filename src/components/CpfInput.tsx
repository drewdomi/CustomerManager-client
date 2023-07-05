import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

type InputCpfProps = {
  value?: string,
  label?: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

function CpfInput({label, value, onChange}: InputCpfProps) {

  return (
    <InputMask mask="999.999.999-99" value={value} onChange={onChange}>
      <TextField
        label={label}
        size="small"
        type="text"
        required
      />
    </InputMask>
  );
}

export default CpfInput;