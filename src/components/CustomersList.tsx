import { Box, Button, Paper, Typography } from "@mui/material";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { maskCpf, maskDate } from "../snippets/handleData";
import { ICustomer } from "../services/models/ICustomer";

interface Props {
  customers?: ICustomer[];
}

function CustomersList({ customers }: Props) {
  return (
    <Paper elevation={2}>
      {customers?.map(customer => (
        <Box
          key={customer.id}
          sx={{
            padding: "20px",
            borderBottom: "solid 1px #b4b4b4",
            backgroundColor: customer.isActive ? "initial" : "#e6e6e6",
          }}
        >
          <Box>
            <Typography><strong>ID:</strong> {customer.id}</Typography>
            <Typography><strong>Nome:</strong> {customer.name}</Typography>
            <Typography><strong>CPF:</strong> {maskCpf(customer.cpf)}</Typography>
            <Typography><strong>E-Mail:</strong> {customer.email}</Typography>
            <Typography><strong>Data de Nascimento:</strong> {maskDate(customer.birthday)}</Typography>
            <Typography
              color={customer.isActive ? "green" : "error"}
            >
              <strong>Status:</strong> {customer.isActive ? "Ativo" : "Inativo"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              startIcon={<EditRoundedIcon />}
            // onClick={() => onEdit(customer)}
            >
              Editar
            </Button>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}


export default CustomersList;