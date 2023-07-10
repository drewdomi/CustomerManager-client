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
            flexGrow: 1,
          }}
        >
          <FormInput
            label="Nome"
            type="search"
          />
        </FormControl>
      </Paper>
    </>
  );
}

export default CustomerSearch;