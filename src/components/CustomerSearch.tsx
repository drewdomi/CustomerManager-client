import { Paper, FormControl, Box, Button, Typography } from "@mui/material";
import Title from "./Title";
import FormInput from "./FormInput";
import { useState } from "react";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import api from "../services/api";

function CustomerSearch() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cpf] = useState("");
  const [errorCpf, setErrorCpf] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [birthday] = useState("");
  const [email] = useState("");
  const [customer, setCustomer] = useState<CustomerProps[]>([{ id, name, cpf, email, birthday }]);

  interface CustomerProps {
    id: string,
    name: string,
    cpf: string,
    email: string,
    birthday: string,
  }

  function cleanInputs() {
    setId("");
    setName("");
    setErrorCpf(false);
    setSearchResult(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!errorCpf) {
      setSearchResult(true);
      await api.get(`?name_like=${name}${id ? `&id=${id}` : ""}`).then(resp => setCustomer(resp.data));
      console.log(customer);
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
              type="id"
              onChange={e => setId(e.target.value)}
              value={id}
              required={false}
              sx={{
                flexGrow: 1,
                width: "100px",
              }}
            />
            <FormInput
              label="Nome"
              onChange={e => setName(e.target.value)}
              value={name}
              required={false}
              sx={{
                flexGrow: 3,
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
              startIcon={<SearchRoundedIcon />}
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
      {searchResult &&
        <Paper
          elevation={2}
          sx={{
            padding: "15px",
          }}
        >
          {customer.map((customer, key) => {
            return (
              <Box
                key={key}
                sx={{
                  marginBottom: "20px",
                }}
              >
                <Typography>ID: {customer.id}</Typography>
                <Typography>Nome: {customer.name}</Typography>
                <Typography>CPF: {customer.cpf}</Typography>
                <Typography>E-Mail: {customer.email}</Typography>
                <Typography>Data de Nascimento: {customer.birthday}</Typography>
              </Box>
            );
          })}

        </Paper>
      }
    </>
  );
}

export default CustomerSearch;