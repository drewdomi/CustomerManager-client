import React, { useState } from 'react';
import { Paper, Button, FormControl, TextField, Box, Typography } from "@mui/material";
import CpfInput from './CpfInput';
import isValidCPF from '../snippets/isValidCpf';
import Alert from './Alert';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import api from '../services/api';

function CustomerForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [errorCpf, setErrorCpf] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!errorCpf) {
      alertHandleOpen();
      api.post("",{name, email, cpf, birthday})
    }
  }

  function handleCpf(maskedCpf: string) {
    const onlyNumbers = (str: string) => str.replace(/[^0-9]/g, "");

    if (maskedCpf.length === 14) {
      if (isValidCPF(maskedCpf)) {
        setErrorCpf(false);
        setCpf(onlyNumbers(maskedCpf));
      }
    }
    else setErrorCpf(true);
  }

  const [alertToggleOpen, setAlertToggleOpen] = useState(false);

  const alertHandleOpen = () => {
    setAlertToggleOpen(true);
  };

  const alertHandleClose = () => {
    setAlertToggleOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
        margin: "auto",
        gap: "15px",
      }}
    >
      <Typography
        variant='h2'
        fontSize="28px"
        fontWeight="Bold"
      >
        Cadastrar Cliente
      </Typography>
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
          <TextField
            label="Nome"
            size='small'
            onChange={e => setName(e.target.value)}
            required
          />
          <TextField
            label="E-mail"
            size='small'
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <CpfInput
              label="CPF"
              onChange={event => handleCpf(event.target.value)}
              error={errorCpf}

            />
            <TextField
              label="Data de Nascimento"
              InputLabelProps={{ shrink: true }}
              size="small"
              onChange={e => setBirthday(e.target.value)}
              type="date"
              required
              sx={{
                flexGrow: 1
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
              type="reset"
              startIcon={<DeleteOutlineRoundedIcon />}
            >Limpar
            </Button>
          </Box>
        </FormControl>
      </Paper>
      <Alert
        alertHandleClose={alertHandleClose}
        alertHandleOpen={alertHandleOpen}
        alertToggleOpen={alertToggleOpen}
        alertTitle={`Cliente Cadastrado com Sucesso`}
      />
    </Box>
  );
}

export default CustomerForm;