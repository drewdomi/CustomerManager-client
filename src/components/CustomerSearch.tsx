import { Paper, FormControl, Box, Button, Typography } from "@mui/material";
import Title from "./Title";
import FormInput from "./FormInput";
import { useState } from "react";
import isValidCPF from "../snippets/isValidCpf";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

function CustomerSearch() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [errorCpf, setErrorCpf] = useState(false);
  const [searchResult, setSearchResult] = useState(false)

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

  function cleanInputs() {
    setId("");
    setName("");
    setCpf("");
    setSearchResult(false)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!errorCpf){
      setSearchResult(true)
    }
  }

  return (
    <>
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
          onSubmit={handleSubmit}
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
            <FormInput
              label="ID"
              type="search"
              onChange={e => setId(e.target.value)}
              value={id}
            />
            <FormInput
              label="CPF"
              type="cpf"
              onChange={e => handleCpf(e.target.value)}
              error={errorCpf}
              value={cpf} 
              required={false}
            />
          </Box>
          <FormInput
            label="Nome"
            onChange={e => setName(e.target.value)}
            value={name}
            required={false}
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
            >
              Pesquisar
            </Button>
            <Button
              onClick={cleanInputs}
              startIcon={<DeleteOutlineRoundedIcon />}
            >
              Limpar
            </Button>
          </Box>
        </FormControl>
      </Paper>
      { searchResult &&
      <Paper
        elevation={2}
        sx={{
          padding: "15px",
        }}  
      >
        <Box>
          <Typography>ID: </Typography>
          <Typography>Nome: </Typography>
          <Typography>CPF: </Typography>
          <Typography>E-Mail: </Typography>
          <Typography>Data de Nascimento: </Typography>
        </Box>
      </Paper>
      }
    </>
  );
}

export default CustomerSearch;