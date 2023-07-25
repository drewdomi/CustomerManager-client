import React, { useState } from 'react';
import { Paper, Button, FormControl, Box } from "@mui/material";
import isValidCPF from '../snippets/isValidCpf';
import CustomAlert from './CustomAlert';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import api from '../services/api';
import Title from './Title';
import FormInput from './FormInput';

function CustomerForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [errorCpf, setErrorCpf] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidCpf = await api.get(`/find?cpf=${cpf}`)
      .then(resp => resp.data)
      .catch(error => {
        if (error.code === "ERR_NETWORK") {
          alertHandleErrorCpf();
          setErrorCpfMessage("Error no Servidor");
        }
      });
    if (!errorCpf) {
      if (isValidCpf.length === 0) {
        alertHandleToggle();

        console.log(name, email, cpf, birthday)
        await api.post("", { name, email, cpf, birthday })
          .then(resp => {
            console.log(resp.data)
          })
          .catch(error => {
            console.log(error)
            if (error.code === "ERR_NETWORK") {
              alertHandleErrorCpf();
              setErrorCpfMessage("Error no Servidor");
            }
          });

        cleanInputs();
      }
      else {
        setErrorCpfMessage("Cliente já cadastrado");
        alertHandleErrorCpf();
      }
    }
    else {
      setErrorCpfMessage("CPF Inválido");
      alertHandleErrorCpf();
    }
  }

  function handleCpf(maskedCpf: string) {
    const onlyNumbers = (str: string) => str.replace(/[^0-9]/g, "");
    setCpf(onlyNumbers(maskedCpf));

    if (maskedCpf.length === 14) {
      if (isValidCPF(maskedCpf)) {
        setErrorCpf(false);
        setCpf(onlyNumbers(maskedCpf));
      }
    }
    else setErrorCpf(true);
  }

  const [alertToggleOpen, setAlertToggleOpen] = useState(false);
  const [alertErrorCpf, setAlertErrorCpf] = useState(false);
  const [errorCpfMessage, setErrorCpfMessage] = useState("");

  const alertHandleErrorCpf = () => {
    setAlertErrorCpf(prev => !prev);
    setTimeout(() => {
      setAlertErrorCpf(false);
    }, 4000);
  };

  const alertHandleToggle = () => {
    setAlertToggleOpen(prev => !prev);
    setTimeout(() => {
      setAlertToggleOpen(false);
    }, 4000);
  };

  function cleanInputs() {
    setName("");
    setEmail("");
    setCpf("");
    setBirthday("");
    setErrorCpf(false)
  }

  return (
    <>
      {
        alertToggleOpen &&
        <CustomAlert
          alertMessage="Cliente cadastrado com sucesso!!"
          type="success"
        />
      }
      {
        alertErrorCpf &&
        <CustomAlert
          alertMessage={errorCpfMessage}
          type="error"
        />

      }
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
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          <FormInput
            label="Nome"
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <FormInput
            label="E-Mail"
            type="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <FormInput
              label="CPF"
              type="cpf"
              onChange={e => handleCpf(e.target.value)}
              error={errorCpf}
              value={cpf}
            />
            <FormInput
              label="Data de Nascimento"
              type="date"
              onChange={e => setBirthday(e.target.value)}
              value={birthday}
              sx={{
                width: "50%",
              }}
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
              onClick={cleanInputs}
              startIcon={<DeleteOutlineRoundedIcon />}
            >Limpar
            </Button>
          </Box>
        </FormControl>
      </Paper>
    </>
  );
}

export default CustomerForm;