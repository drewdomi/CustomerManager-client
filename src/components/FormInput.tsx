import { InputAdornment, TextField } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InputMask from "react-input-mask";


type FormInputProps = {
  value?: string,
  label: string,
  type?: string,
  error?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

function FormInput({ value, label, type = "text", error, onChange }: FormInputProps) {
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
          required
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
        required
        value={value}
        sx={{
          flexGrow: 1
        }}
      />
    );
  }
  if (type === "search") {
    return (
      <TextField
        type={type}
        placeholder={label}
        size='small'
        onChange={onChange}
        value={value}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
  return (
    <TextField
      label={label}
      size='small'
      onChange={onChange}
      type={type}
      error={error}
      value={value}
      required
      sx={{
        flexGrow: 1
      }}
    />
  );
}

export default FormInput;