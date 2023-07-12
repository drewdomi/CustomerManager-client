import { Paper, FormControl, Box, Button, Typography } from "@mui/material";
import Title from "./Title";
import FormInput from "./FormInput";
import { useState } from "react";
import api from "../services/api";
import CustomAlert from './CustomAlert';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';

function CustomerSearch() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cpf] = useState("");
  const [errorCpf, setErrorCpf] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [birthday] = useState("");
  const [email] = useState("");
  const [customer, setCustomer] = useState<CustomerProps[]>([{ id, name, cpf, email, birthday }]);


  const [alertToggleOpen, setAlertToggleOpen] = useState(true);

  const alertHandleOpen = () => {
    setAlertToggleOpen(true);
  };

  const alertHandleClose = () => {
    setAlertToggleOpen(false);
  };

  const alertHandleConfirm = () => {
    alertHandleClose();
  };
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

  async function deleteCustomer(id: string) {
    await api.delete(`${id}`);
    setSearchResult(false);
  }

  return (
    <>
      <CustomAlert
      />
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
                  paddingBottom: "10px",
                  marginBottom: "10px",
                  borderBottom: "solid 1px #b4b4b4",
                }}
              >
                <Box>
                  <Typography><strong>ID:</strong> {customer.id}</Typography>
                  <Typography><strong>Nome:</strong> {customer.name}</Typography>
                  <Typography><strong>CPF:</strong> {customer.cpf}</Typography>
                  <Typography><strong>E-Mail:</strong> {customer.email}</Typography>
                  <Typography><strong>Data de Nascimento:</strong> {customer.birthday}</Typography>
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
                    color="success"
                    startIcon={<EditRoundedIcon />}
                    onClick={() => alert("edit")}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteCustomer(customer.id)}
                    startIcon={<PersonRemoveRoundedIcon />}
                  >
                    Excluir
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Paper>
      }
    </>
  );
}

export default CustomerSearch;