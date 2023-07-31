import { TextField } from "@mui/material";
import InputMask from "react-input-mask";

type FormInputProps = {
  value?: string,
  label: string,
  type?: string,
  error?: boolean,
  sx?: object,
  required?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean,
};

function FormInput({
  value,
  label,
  type = "text",
  error,
  sx,
  required = true,
  onChange,
  disabled = false,
}: FormInputProps) {
  if (type === "cpf") {
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
          required={required}
          error={error}
          sx={{
            flexGrow: 1
          }}
          
        />
      </InputMask>
    );
  }
  if (type === "date") {
    return (
      <TextField
        label={label}
        InputLabelProps={{ shrink: true }}
        size="small"
        onChange={onChange}
        type={type}
        required={required}
        value={value}
        sx={{
          ...sx,
          flexGrow: 1
        }}
      />
    );
  }
  if (type === "search") {
    return (
      <TextField
        type={type}
        label={label}
        size='small'
        onChange={onChange}
        value={value}
        required={false}
        sx={{
          flexGrow: 1,
          ...sx
        }}
        inputProps={{ maxLength: 60 }}
      />
    );
  }
  if (type === "id") {
    return (
      <InputMask
        mask="9999999"
        maskPlaceholder=""
        value={value}
        onChange={onChange}
      >
        <TextField
          label={label}
          size="small"
          type="text"
          required={required}
          error={error}
          sx={{
            ...sx
          }}
        />
      </InputMask>
    )
  }
  return (
    <TextField
      label={label}
      size='small'
      onChange={onChange}
      type={type}
      error={error}
      value={value}
      required={required}
      disabled={disabled}
      sx={{
        ...sx
      }}
      inputProps={{ maxLength: 60 }}
    />
  );
}

export default FormInput;