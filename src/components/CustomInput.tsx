import { TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { InputValues } from "./CustomerForm";

type ControllerProps = {
  label: string,
  name: keyof InputValues,
  control: Control<InputValues>,
};

function CustomInput({ label, name, control }: ControllerProps) {
  return (
    <Controller
      render={
        ({ field }) => (
          <TextField
            {...field}
            label={label}
            type="text"
            size="small"
          />
        )}
      name={name}
      control={control}
      defaultValue=""
    />
  );
}

export default CustomInput;