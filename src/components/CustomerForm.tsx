import React, { useState } from 'react';
import { Button, FormControl, FormLabel, TextField, Box } from "@mui/material";

function CustomerForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthday, setBirthday] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(name, cpf, birthday);
  }

  return (
    <Box>
      <FormControl component="form" autoComplete="off" onSubmit={handleSubmit}>
        <FormLabel>Nome</FormLabel>
        <TextField
          placeholder="Insira o Nome"
          size='small'
          onChange={e => setName(e.target.value)}
        />
        <FormLabel>CPF</FormLabel>
        <TextField
          placeholder="Insira o CPF"
          size="small"
          onChange={e => setCpf(e.target.value)}
          type="number"
        />
        <FormLabel>Data de Nascimento</FormLabel>
        <TextField
          size="small"
          onChange={e => setBirthday(e.target.value)}
          type="date"
        />

        <Button
          variant="contained"
          type="submit"
        >Enviar
        </Button>
        <Button
          type="reset"
        >Limpar
        </Button>
      </FormControl>
    </Box>

  );
}

export default CustomerForm;