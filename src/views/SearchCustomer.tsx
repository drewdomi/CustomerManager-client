import { Paper, Button, FormControl, Box, Typography, Checkbox, FormControlLabel } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import api from "../services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import Title from '../components/Title';
import CustomInput from "../components/CustomInput";
import { useMutation } from "@tanstack/react-query";
import { InputValues } from "./RegisterCustomer";
import { ICustomer } from "../services/models/ICustomer";
import CustomAlert, { AlertType } from "../components/CustomAlert";
import { useState } from "react";
import CustomersList from "../components/CustomersList";

function SearchCustomer() {

  const { handleSubmit, reset, control } = useForm<InputValues>();
  const [alert, setAlert] = useState<{ type: AlertType; message: string; } | null>(null);

  const customersMutation = useMutation({
    mutationKey: ["customers"],
    mutationFn: ({ id, name, cpf }: InputValues) => {
      const apiUrl = id ? `customers/${id}` : `customers/find?name=${name}&cpf=${cpf}`;
      return api.get<ICustomer[]>(apiUrl).then((res) => id ? [res.data] : res.data);
    },
  });

  const showCustomAlert = (type: AlertType, message: string) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const resetForm = () => {
    showCustomAlert('success', 'Parâmetros limpos.');
    reset();
  };

  const onSubmit: SubmitHandler<InputValues> = async (data, event) => {
    event?.preventDefault();
    customersMutation.mutate(data);
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
        Pesquisar Cliente
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <CustomInput
              control={control}
              label="ID"
              required={false}
              inputType="id"
              name="id"
            />
            <CustomInput
              control={control}
              label="CPF"
              required={false}
              inputType="cpf"
              name="cpf"
            />
          </Box>
          <CustomInput
            control={control}
            label="Nome"
            required={false}
            name="name"
          />
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: {xs: 'end', sm: "space-between"},
              alignItems: "center",
              marginTop: "10px",
              flexWrap: {xs: "wrap", sm: "no-wrap"},
            }}
          >
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Mostrar Inativos"
            />
            <Box sx={{
              display: "flex",
              gap: "20px",
              justifyContent: "space-between",
            }}>
              <Button
                onClick={resetForm}
                startIcon={<DeleteOutlineRoundedIcon />}
              >
                Limpar
              </Button>
              <Button
                variant="contained"
                type="submit"
                color="success"
                startIcon={<SearchRoundedIcon />}
              >
                Pesquisar
              </Button>
            </Box>
          </Box>
        </FormControl>
      </Paper>
      {customersMutation.isLoading ?
        (<Typography variant="h6" align="center">Carregando...</Typography>)
        : customersMutation.data?.length === 0 ?
          (<Typography variant="h6" align="center">Nenhum cliente encontrado.</Typography>)
          : customersMutation.isError ?
            (<Typography variant="h6" align="center">Erro ao pesquisar.</Typography>)
            : null
      }
      <CustomersList customers={customersMutation.data as ICustomer[]} />
    </>
  );
}

export default SearchCustomer;