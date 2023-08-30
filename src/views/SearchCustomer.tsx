import { Paper, Button, FormControl, Box } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
// import EditRoundedIcon from '@mui/icons-material/EditRounded';
// import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
// import CustomAlert, { AlertType } from "../components/CustomAlert";
// import api from "../services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import Title from '../components/Title';
import CustomInput from "../components/CustomInput";
// import { useQuery } from "@tanstack/react-query";
import { InputValues } from "./RegisterCustomer";


function SearchCustomer() {

  const { handleSubmit, reset, control } = useForm<InputValues>();

  // const customersQuery = useQuery({
  //   queryKey: ["customers"],
  //   queryFn: () => {
  //     if (!localStorage.getItem("customers")) {
  //       api.get("customers").then(res => {
  //         localStorage.setItem("customers", JSON.stringify(res.data.results));
  //         return res.data.results;
  //       });
  //     } else {
  //       return JSON.parse(localStorage.getItem("customers") || "");
  //     }
  //   }
  // });

  // if (customersQuery.isLoading) return <Loader />;
  // if (customersQuery.isError) return <h1>Error</h1>;


  const resetForm = () => {
    // showCustomAlert('success', 'Formulário limpo.');
    reset();
  };

  const onSubmit: SubmitHandler<InputValues> = async (data, event) => {
    event?.preventDefault();
    console.log(data)
  };

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
          onSubmit={handleSubmit(onSubmit)}
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
            <CustomInput
              control={control}
              label="ID"
              required={false}
              inputType="id"
              name="id"
            />
            <CustomInput
              control={control}
              label="CPF"
              required={false}
              inputType="cpf"
              name="cpf"
            />
          </Box>
          <CustomInput
              control={control}
              label="Nome"
              required={false}
              name="name"
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
              color="success"
              startIcon={<SearchRoundedIcon />}
            >
              Pesquisar
            </Button>
            <Button
              onClick={resetForm}
              startIcon={<DeleteOutlineRoundedIcon />}
            >
              Limpar
            </Button>
          </Box>

        </FormControl>
      </Paper>
    </>
  );
}

export default SearchCustomer;