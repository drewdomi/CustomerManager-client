import React, { useState } from 'react';
import { Button, FormControl, TextField, Box, Typography } from "@mui/material";
import CpfInput from './CpfInput';
import isValidCPF from '../snippets/isValidCpf';
import Alert from './Alert';

function CustomerForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [errorCpf, setErrorCpf] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alertHandleOpen()
    if (!errorCpf) {
      console.log(name, cpf, birthday, email);
    }
  }

  function handleCpf(maskedCpf: string) {
    const onlyNumbers = (str: string) => str.replace(/[^0-9]/g, "");

    if (maskedCpf.length === 14) {
      console.log(isValidCPF(maskedCpf));
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
        maxWidth: 700,
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
      <FormControl
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          gap: "10px",
          boxShadow: "0 0 4px #000000aa",
          padding: "20px 15px 25px",
          borderRadius: 2,
        }}
      >
        <TextField
          label="Insira o Nome"
          size='small'
          onChange={e => setName(e.target.value)}
          required
        />
        <TextField
          label="Insira o Email"
          size='small'
          onChange={e => setEmail(e.target.value)}
          type="email"
          required
        />
        <CpfInput
          label="Insira o CPF"
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
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            type="submit"
          >Salvar
          </Button>
          <Button
            type="reset"
          >Limpar
          </Button>
        </Box>
      </FormControl>
      <Alert
        alertHandleClose={alertHandleClose}
        alertHandleOpen={alertHandleOpen}
        alertToggleOpen={alertToggleOpen}
      />
    </Box>
  );
}

export default CustomerForm;