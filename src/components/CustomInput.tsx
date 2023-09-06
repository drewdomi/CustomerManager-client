import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { InputValues } from "../views/RegisterCustomer";
import InputMask from "react-input-mask";

type InputType = "text" | "date" | "id" | "cpf" | "email";

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
  value
}: Props) {
  const typeInputs: TypeInput = {
    text: (
      <Controller
        render={({ field, field: {onChange, value} }) => (
          <TextField
            {...field}
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            required={required}
            type={inputType}
            label={label}
            size="small"
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
        render={({ field, field: {onChange, value} }) => (
          <TextField
            {...field}
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            required={required}
            type="email"
            label={label}
            size="small"
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
    date: (
      <Controller
        render={({ field, field: {onChange, value} }) => (
          <TextField
            {...field}
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            required={required}
            type="date"
            label={label}
            size="small"
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
        render={({ field, field: {onChange, value} }) => (
          <InputMask
            mask="999.999.999-99"
            maskPlaceholder=""
            {...field}
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
          >
            <TextField
              required={required}
              type={inputType}
              label={label}
              size="small"
              sx={{
                flexGrow: 1
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
          <InputMask
            mask="999999"
            maskPlaceholder=""
            {...field}
          >
            <TextField
              required={required}
              type="text"
              label={label}
              size="small"
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
    )
  };

  return <>{typeInputs[inputType]}</>;
}

export default CustomInput;
