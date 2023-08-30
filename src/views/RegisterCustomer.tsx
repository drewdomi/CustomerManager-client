import { Paper, Button, FormControl, Box } from "@mui/material";
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Title from '../components/Title';
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from '../components/CustomInput';
import api from "../services/api";
import { unMaskCpf } from "../snippets/handleData";
import CustomAlert, { AlertType } from "../components/CustomAlert";
import { useState } from "react";

export type InputValues = {
  id: number;
  name: string;
  cpf: string;
  email: string;
  birthday: string;
};

function RegisterCustomer() {

  const { handleSubmit, control, reset } = useForm<InputValues>();
  const [alert, setAlert] = useState<{ type: AlertType; message: string; } | null>(null);

  const showCustomAlert = (type: AlertType, message: string) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const resetForm = () => {
    showCustomAlert('success', 'Formulário limpo.');
    reset();
  };

  const onSubmit: SubmitHandler<InputValues> = async (data, event) => {
    event?.preventDefault();

    const isValidDoc = await api.get(`verify-cpf/${data.cpf}`).then(res => res.data);

    if (!isValidDoc) {
      showCustomAlert("error", "CPF inválido");
      return;
    }

    const isCpfRegisted = await api.get(`customers/find?cpf=${unMaskCpf(data.cpf)}`)
      .then(res => res.data)
      .catch(error => {
        console.log(error, "Error no Servidor");
      });

    if (isCpfRegisted.length !== 0) showCustomAlert("error", "Cliente já cadastrado");
    else {
      await api.post("customers", data)
        .then(() => {
          showCustomAlert("success", "Cliente cadastrado com sucesso");
          reset();
        })
        .catch(error => {
          console.log(error, "Error no Servidor");
        });
    }
  };

  return (
    <>
      {alert && (
        <CustomAlert
          alertType={alert.type}
          alertMessage={alert.message}
        />
      )}
      <Title>
        Cadastrar Cliente
      </Title>
      <Paper
        elevation={2}
        sx={{
          padding: "15px",
        }}
      >
        <FormControl
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <CustomInput
            control={control}
            name="name"
            label="Nome"
          />
          <CustomInput
            control={control}
            name="email"
            label="E-Mail"
            inputType="email"
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <CustomInput
              control={control}
              name="cpf"
              label="CPF"
              inputType="cpf"
            />
            <CustomInput
              control={control}
              name="birthday"
              label="Data de nascimento"
              inputType="date"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              startIcon={<DoneRoundedIcon />}
            >Salvar
            </Button>
            <Button
              onClick={resetForm}
              startIcon={<DeleteOutlineRoundedIcon />}
            >Limpar
            </Button>
          </Box>
        </FormControl>
      </Paper>
    </>
  );
}

export default RegisterCustomer;