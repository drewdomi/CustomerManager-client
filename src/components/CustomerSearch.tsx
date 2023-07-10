import { Paper, FormControl } from "@mui/material";
import Title from "./Title";
import FormInput from "./FormInput";

function CustomerSearch() {
  return (
    <>
      <Title>
        Pesquisar Cliente
      </Title>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          gap: "10px",
          padding: "15px",
        }}
      >
        <FormControl
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <FormInput
            label="ID"
            type="search"
            sx={{
              flexGrow: 1,
            }}
          />
          <FormInput
            label="CPF"
            type="cpf"
            required={false}
            sx={{
              flexGrow: 1,
            }}
          />
          <FormInput
            label="Nome"
            type="search"
            sx={{
              flexGrow: 3,
            }}
          />
        </FormControl>
      </Paper>
    </>
  );
}

export default CustomerSearch;