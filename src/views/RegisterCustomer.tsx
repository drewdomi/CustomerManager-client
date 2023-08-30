import { Paper, Button, FormControl, Box } from "@mui/material";
// import isValidCPF from '../snippets/isValidCpf';
// import CustomAlert from './CustomAlert';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
// import api from '../services/api';
import Title from '../components/Title';

import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from '../components/CustomInput';
import api from "../services/api";
import { unMaskCpf } from "../snippets/handleData";

export type InputValues = {
  name: string;
  cpf: string;
  email: string;
  birthday: string;
};

function RegisterCustomer() {

  const { handleSubmit, control, reset } = useForm<InputValues>();

  const onSubmit: SubmitHandler<InputValues> = async (data, event) => {
    event?.preventDefault();
    // console.log(data);

    const isValidDoc = await api.get(`verify-cpf/${data.cpf}`).then(res => res.data);

    if (!isValidDoc) {
      console.log("CPF inválido");
      return;
    }

    const isCpfRegisted = await api.get(`customers/find?cpf=${unMaskCpf(data.cpf)}`)
      .then(res => res.data)
      .catch(error => {
        console.log(error, "Error no Servidor");
      });

    if (isCpfRegisted.length !== 0) console.log("Cliente já cadastrado");
      else {
      await api.post("customers", data)
        .then(() => reset())
        .catch(error => {
          console.log(error, "Error no Servidor");
        });      
    }
  };

  // async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const isValidCpf = await api.get(`/find?cpf=${cpf}`)
  //     .then(resp => resp.data)
  //     .catch(error => {
  //       if (error.code === "ERR_NETWORK") {
  //         alertHandleErrorCpf();
  //         setErrorCpfMessage("Error no Servidor");
  //       }
  //     });
  //   if (!errorCpf) {
  //     if (isValidCpf.length === 0) {
  //       alertHandleToggle();

  //       console.log(name, email, cpf, birthday)
  //       await api.post("", { name, email, cpf, birthday })
  //         .then(resp => {
  //           console.log(resp.data)
  //         })
  //         .catch(error => {
  //           console.log(error)
  //           if (error.code === "ERR_NETWORK") {
  //             alertHandleErrorCpf();
  //             setErrorCpfMessage("Error no Servidor");
  //           }
  //         });

  //       cleanInputs();
  //     }
  //     else {
  //       setErrorCpfMessage("Cliente já cadastrado");
  //       alertHandleErrorCpf();
  //     }
  //   }
  //   else {
  //     setErrorCpfMessage("CPF Inválido");
  //     alertHandleErrorCpf();
  //   }
  // }

  // function handleCpf(maskedCpf: string) {
  //   const onlyNumbers = (str: string) => str.replace(/[^0-9]/g, "");
  //   setCpf(onlyNumbers(maskedCpf));

  //   if (maskedCpf.length === 14) {
  //     if (isValidCPF(maskedCpf)) {
  //       setErrorCpf(false);
  //       setCpf(onlyNumbers(maskedCpf));
  //     }
  //   }
  //   else setErrorCpf(true);
  // }

  // const [alertToggleOpen, setAlertToggleOpen] = useState(false);
  // const [alertErrorCpf, setAlertErrorCpf] = useState(false);
  // const [errorCpfMessage, setErrorCpfMessage] = useState("");

  // const alertHandleErrorCpf = () => {
  //   setAlertErrorCpf(prev => !prev);
  //   setTimeout(() => {
  //     setAlertErrorCpf(false);
  //   }, 4000);
  // };

  // const alertHandleToggle = () => {
  //   setAlertToggleOpen(prev => !prev);
  //   setTimeout(() => {
  //     setAlertToggleOpen(false);
  //   }, 4000);
  // };

  return (
    <>
      <Title>
        Cadastrar Cliente
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
          <CustomInput
            control={control}
            name="name"
            label="Nome"
          />
          <CustomInput
            control={control}
            name="email"
            label="E-Mail"
            inputType="email"
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <CustomInput
              control={control}
              name="cpf"
              label="CPF"
              inputType="cpf"
            />
            <CustomInput
              control={control}
              name="birthday"
              label="Data de nascimento"
              inputType="date"
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
              startIcon={<DoneRoundedIcon />}
            >Salvar
            </Button>
            <Button
              onClick={() => reset()}
              startIcon={<DeleteOutlineRoundedIcon />}
            >Limpar
            </Button>
          </Box>
        </FormControl>
      </Paper>
    </>
  );
}

export default RegisterCustomer;