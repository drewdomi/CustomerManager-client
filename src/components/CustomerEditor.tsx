import Modal from '@mui/material/Modal';
import { Box, Button, FormControl, Paper } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useState } from 'react';
import FormInput from './FormInput';
import isValidCPF from '../snippets/isValidCpf';
import api from '../services/api';
import CustomAlert from './CustomAlert';

type ModalProps = {
  isOpen: boolean,
  handleModalClose: () => void,
  customer: {
    id: string,
    name: string,
    cpf: string,
    email: string,
    birthday: string,
  },
};

function CustomerEditor({
  isOpen,
  handleModalClose,
  customer,
}: ModalProps) {
  const [id, setId] = useState(customer.id);
  const [errorCpf, setErrorCpf] = useState(false);
  const [name, setName] = useState(customer.name);
  const [cpf, setCpf] = useState(customer.cpf);
  const [email, setEmail] = useState(customer.email);
  const [birthday, setBirthday] = useState(customer.birthday);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidCpf = await api.get(`?cpf=${cpf}`).then(resp => resp.data);
    if (!errorCpf) {
      if (isValidCpf.length === 0) {
        alertHandleToggle();
        await api.put(`${id}`, { name, email, cpf, birthday });
        cleanInputs();
      }
      else {
        console.log("Cliente já cadastrado")
        setErrorCpfMessage("Cliente já cadastrado");
        alertHandleErrorCpf();
      }
    }
    else {
      console.log("CPF Inválido")
      setErrorCpfMessage("CPF Inválido");
      alertHandleErrorCpf();
    }
  }

  function cleanInputs() {
    setId("");
    setName("");
    setEmail("");
    setCpf("");
    setBirthday("");
  }

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

  const alertHandleErrorCpf = () => {
    setAlertErrorCpf(prev => !prev);
    setTimeout(() => {
      setAlertErrorCpf(false);
    }, 4000);
  };

  const alertHandleToggle = () => {
    setAlertToggleOpen(prev => !prev);
    setTimeout(() => {
      setAlertToggleOpen(false);
    }, 4000);
  };

  const [alertToggleOpen, setAlertToggleOpen] = useState(false);
  const [alertErrorCpf, setAlertErrorCpf] = useState(false);
  const [errorCpfMessage, setErrorCpfMessage] = useState("");

  return (
    <div>
      {
        alertToggleOpen &&
        <CustomAlert
          alertMessage="Cliente cadastrado com sucesso!!"
          type="success"
        />
      }
      {
        alertErrorCpf &&
        <CustomAlert
        alertMessage={errorCpfMessage}
        type="error"
        />
      }
      <Modal
        open={isOpen}
        onClose={handleModalClose}
        aria-labelledby="Editar Cliente"
        aria-describedby="Um Formulario para editar informações de um cliente específico"
      >
        <Paper
          elevation={2}
          sx={{
            padding: "15px",
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: "90%",
            height: "100%",
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: "20px",
            p: 4,
          }}
        >
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
              <FormInput
                label="Nome"
                onChange={e => setName(e.target.value)}
                value={name}
              />
              <FormInput
                label="E-Mail"
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <FormInput
                  label="CPF"
                  type="cpf"
                  onChange={e => handleCpf(e.target.value)}
                  error={errorCpf}
                  value={cpf}
                />
                <FormInput
                  label="Data de Nascimento"
                  type="date"
                  onChange={e => setBirthday(e.target.value)}
                  value={birthday}
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
                  onClick={cleanInputs}
                  startIcon={<DeleteOutlineRoundedIcon />}
                >Limpar
                </Button>
              </Box>
            </FormControl>
          </Paper>
        </Paper>
      </Modal>
    </div>
  );
}

export default CustomerEditor;