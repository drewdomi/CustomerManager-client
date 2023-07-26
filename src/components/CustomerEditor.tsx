import Modal from '@mui/material/Modal';
import { Box, Button, FormControl, Paper } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
import FormInput from './FormInput';
import api from '../services/api';
import CustomAlert from './CustomAlert';
import maskCpf from '../snippets/maskCpf';

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
  const [id] = useState(customer.id);
  const [errorCpf] = useState(false);
  const [name, setName] = useState(customer.name);
  const [cpf] = useState(customer.cpf);
  const [email, setEmail] = useState(customer.email);
  const [birthday, setBirthday] = useState(customer.birthday);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValidCpf = await api.get(`find?cpf=${cpf}`).then(resp => resp.data);
    if (!errorCpf) {
      if (isValidCpf.length === 0 || isValidCpf[0].cpf === cpf) {
        await api.put(`/${id}`, { name, email, birthday })
          .then(resp => console.log(resp.data))
        setAlertToggleOpen(true);
        setTimeout(() => {
          handleModalClose()
        }, 1000)
      }
      else {
        setErrorMessage("Cliente já cadastrado");
        setAlertError(true);
      }
    }
    else {
      setErrorMessage("CPF Inválido");
      setAlertError(true);
    }
  }

  const [alertToggleOpen, setAlertToggleOpen] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleModalClose}
        aria-labelledby="Editar Cliente"
        aria-describedby="Um Formulario para editar informações de um cliente específico"
      >
        <Paper
          elevation={2}
          sx={{
            padding: "20px 15px 0",
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: "70%",
            width: "90%",
            maxWidth: "700px",
            margin: "auto",
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              width: "calc(100% - 29px)",

            }}
          >
            {
              alertToggleOpen &&
              <CustomAlert
                alertMessage="Cliente Alterado!!"
                type="success"
              />
            }
            {
              alertError &&
              <CustomAlert
                alertMessage={errorMessage}
                type="error"
              />
            }
          </Box>
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
              required={false}
            />
            <FormInput
              label="E-Mail"
              type="email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required={false}
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
                value={maskCpf(cpf)}
                required={false}
                disabled
              />
              <FormInput
                label="Data de Nascimento"
                type="date"
                onChange={e => setBirthday(e.target.value)}
                value={birthday}
                required={false}
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
                onClick={handleModalClose}
                startIcon={<CloseRoundedIcon />}
              >Fechar
              </Button>
            </Box>
          </FormControl>
        </Paper>
      </Modal>
    </>
  );
}

export default CustomerEditor;