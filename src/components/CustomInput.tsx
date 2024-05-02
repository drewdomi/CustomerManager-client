import * as React from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { InputValues } from "../views/RegisterCustomer";
import InputMask from "react-input-mask";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type InputType =
  | "text"
  | "date"
  | "id"
  | "cpf"
  | "email"
  | "isActive"
  | "password";

type Props = {
  inputType?: InputType;
  label: string;
  name: keyof InputValues;
  control: Control<InputValues>;
  required?: boolean;
  disabled?: boolean;
  value?: string;
};

type TypeInput = {
  [key in InputType]: JSX.Element;
};

function CustomInput({
  label,
  name,
  control,
  inputType = "text",
  required = true,
  disabled = false,
  value,
}: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const typeInputs: TypeInput = {
    text: (
      <Controller
        render={({ field, field: { onChange, value } }) => (
          <TextField
            {...field}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            type={inputType}
            label={label}
            sx={{
              flexGrow: 1,
            }}
            inputProps={{ maxLength: 60 }}
          />
        )}
        name={name}
        control={control}
        defaultValue={value}
      />
    ),
    email: (
      <Controller
        render={({ field, field: { onChange, value } }) => (
          <TextField
            {...field}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            type="email"
            label={label}
            sx={{
              flexGrow: 1,
            }}
            inputProps={{ maxLength: 60 }}
          />
        )}
        name={name}
        control={control}
        defaultValue={value}
      />
    ),
    password: (
      <Controller
        render={({ field, field: { onChange, value } }) => (
          <FormControl variant="outlined">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              {...field}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              type={showPassword ? "text" : "password"}
              sx={{
                flexGrow: 1,
              }}
              inputProps={{ maxLength: 60 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        )}
        name={name}
        control={control}
        defaultValue={value}
      />
    ),

    date: (
      <Controller
        render={({ field, field: { onChange, value } }) => (
          <TextField
            {...field}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            type="date"
            label={label}
            InputLabelProps={{ shrink: true }}
            sx={{
              flexGrow: 1,
              width: "50%",
            }}
          />
        )}
        name={name}
        control={control}
        defaultValue={value}
      />
    ),
    cpf: (
      <Controller
        render={({ field, field: { onChange, value } }) => (
          <InputMask
            mask="999.999.999-99"
            maskPlaceholder=""
            {...field}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          >
            <TextField
              required={required}
              type={inputType}
              label={label}
              sx={{
                flexGrow: 1,
              }}
            />
          </InputMask>
        )}
        name={name}
        control={control}
        defaultValue={value}
      />
    ),
    id: (
      <Controller
        render={({ field }) => (
          <InputMask mask="999999" maskPlaceholder="" {...field}>
            <TextField
              required={required}
              type="text"
              label={label}
              sx={{
                flexGrow: 1,
                width: "80px",
              }}
            />
          </InputMask>
        )}
        name={name}
        control={control}
        defaultValue=""
      />
    ),
    isActive: (
      <Controller
        render={({ field, field: { onChange, value } }) => (
          <Select
            sx={{ width: "150px" }}
            color="warning"
            {...field}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            defaultValue={value}
            type={inputType}
            required={false}
          >
            <MenuItem value={"ativo"}>Ativo</MenuItem>
            <MenuItem value={"inativo"}>Inativo</MenuItem>
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={value}
      />
    ),
  };

  return <>{typeInputs[inputType]}</>;
}

export default CustomInput;
