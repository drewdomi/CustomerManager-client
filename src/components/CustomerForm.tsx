import React, { useState } from 'react';
import { Button, FormControl, TextField, Box } from "@mui/material";
import CpfInput from './CpfInput';

function CustomerForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(name, cpf, birthday, email);
  }

  return (
    <FormControl
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        maxWidth: 300,
        margin: "auto",
        gap: "10px",
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
        onChange={event => setCpf(event.target.value)}
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
  );
}

export default CustomerForm;