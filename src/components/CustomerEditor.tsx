import Modal from '@mui/material/Modal';
import { Box, Button, FormControl, Paper, Typography } from '@mui/material';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CustomInput from './CustomInput';
// import { useState } from 'react';
// import api from '../services/api';
// import CustomAlert from './CustomAlert';
// import { maskCpf } from '../snippets/handleData';
import { useForm, SubmitHandler } from "react-hook-form";
import { InputValues } from '../views/RegisterCustomer';
import { ICustomer } from '../services/models/ICustomer';

type ModalProps = {
  isOpen: boolean;
  handleModalClose: () => void;
  customer: ICustomer | null;
};

function CustomerEditor({
  isOpen,
  handleModalClose,
  customer,
}: ModalProps) {
  const { handleSubmit, control } = useForm<InputValues>();

  const onSubmit: SubmitHandler<InputValues> = async (data, event) => {
    event?.preventDefault();
    console.log(data);
  };

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
          <Typography variant="h6" sx={{marginBottom: "30px",}}>Editar Cliente</Typography>
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              width: "calc(100% - 29px)",

            }}>
          </Box>
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
              label="Nome"
              required={false}
              name="name"
              value={customer?.name}
            />
            <CustomInput
              control={control}
              label="E-Mail"
              required={false}
              inputType="email"
              name="email"
              value={customer?.email}
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
                label="CPF"
                inputType="cpf"
                name="cpf"
                value={customer?.cpf}
                disabled={true}
              />
              <CustomInput
                control={control}
                label="Data de Nascimento"
                required={false}
                inputType="date"
                name="birthday"
                value={customer?.birthday}
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