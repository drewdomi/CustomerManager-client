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
};

type TypeInput = {
  [key in InputType]: JSX.Element;
};

function CustomInput({ label, name, control, inputType = "text", required = true }: Props) {
  const typeInputs: TypeInput = {
    text: (
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
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
        defaultValue=""
      />
    ),
    email: (
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
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
        defaultValue=""
      />
    ),
    date: (
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
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
        defaultValue=""
      />
    ),
    cpf: (
      <Controller
        render={({ field }) => (
          <InputMask
            mask="999.999.999-99"
            maskPlaceholder=""
            {...field}
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
        defaultValue=""
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
              type={inputType}
              label={label}
              size="small"
              sx={{
                flexGrow: 1,
                width: "50%",
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
