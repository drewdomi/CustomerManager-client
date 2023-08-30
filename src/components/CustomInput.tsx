import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { InputValues } from "./CustomerForm";

type InputType = "text" | "date" | "id" | "cpf";

type Props = {
  inputType?: InputType;
  label: string;
  name: keyof InputValues;
  control: Control<InputValues>;
};

type TypeInput = {
  [key in InputType]: JSX.Element;
};

function CustomInput({ label, name, control, inputType = "text" }: Props) {
  const typeInputs: TypeInput = {
    text: (
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            type={inputType}
            label={label}
            size="small"
            sx={{
              flexGrow: 1,
            }}
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
          <TextField
            {...field}
            type={inputType}
            label={label}
            size="small"
            sx={{
              flexGrow: 1
            }}
          />
        )}
        name={name}
        control={control}
        defaultValue=""
      />
    ),
    id: (
      <Controller
        render={({ field }) => (
          <TextField
            {...field}
            type={inputType}
            label={label}
            size="small"
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
    )
  };

  return <>{typeInputs[inputType]}</>;
}

export default CustomInput;
