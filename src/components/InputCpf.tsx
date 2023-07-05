import { TextField } from "@mui/material";
import { ReactNode } from "react";
import InputMask from "react-input-mask";

type InputCpfProps = {
  value?: string,
  label?: string,
  onchange?: () => void,
  children?: ReactNode;
};

function CpfInput({value, onchange}: InputCpfProps) {
  return (
    <InputMask mask="999.999.999-99" value={value}>
      <TextField
        label="Insira o CPF"
        size="small"
        onChange={onchange}
        type="text"
        required
      />
    </InputMask>
  );
}

export default CpfInput;