import React, { useState } from 'react';
import { Button, FormControl, TextField, Box } from "@mui/material";

function CustomerForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthday, setBirthday] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(name, cpf, birthday);
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
      />
      <TextField
        label="Insira o CPF"
        size="small"
        onChange={e => setCpf(e.target.value)}
        type="number"
      />
      <TextField
        label="Data de Nascimento"
        InputLabelProps={{ shrink: true }}
        size="small"
        onChange={e => setBirthday(e.target.value)}
        type="date"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
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