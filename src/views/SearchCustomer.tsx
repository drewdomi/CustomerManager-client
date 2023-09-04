import { Paper, Button, FormControl, Box, Typography } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import api from "../services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import Title from '../components/Title';
import CustomInput from "../components/CustomInput";
import { useQuery } from "@tanstack/react-query";
import { InputValues } from "./RegisterCustomer";
import { ICustomer } from "../services/models/ICustomer";
import CustomAlert, { AlertType } from "../components/CustomAlert";
import { useState } from "react";
import CustomersList from "../components/CustomersList";

function SearchCustomer() {

  const { handleSubmit, reset, control } = useForm<InputValues>();
  const [alert, setAlert] = useState<{ type: AlertType; message: string; } | null>(null);

  // `customers/find?name=${data.name ? data.name : ""}&cpf=${data.cpf ? data.cpf : ""}`
  const customersQuery = useQuery({
    queryKey: ["customers"],
    queryFn: () => {
      return api.get<ICustomer[]>("customers").then(res => {
        return res.data;
      });
    }
  });

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
    console.log(data);
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
              justifyContent: "end",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              color="success"
              startIcon={<SearchRoundedIcon />}
            >
              Pesquisar
            </Button>
            <Button
              onClick={resetForm}
              startIcon={<DeleteOutlineRoundedIcon />}
            >
              Limpar
            </Button>
          </Box>
        </FormControl>
      </Paper>
      {customersQuery.isLoading ?
        (<Typography variant="h6" align="center">Carregando...</Typography>)
        : customersQuery.isError ?
          (<Typography variant="h6" align="center">Error</Typography>)
          : null
      }
      <CustomersList customers={customersQuery.data} />
    </>
  );
}

export default SearchCustomer;