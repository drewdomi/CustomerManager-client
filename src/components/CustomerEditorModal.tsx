import Modal from '@mui/material/Modal';
import CustomerForm from './CustomerForm';
// import { CustomerProps } from "./CustomerSearch";
import { Paper } from '@mui/material';

type ModalProps = {
  isOpen: boolean,
  handleModalClose: () => void,
};

function CustomerEditorModal({
  isOpen,
  handleModalClose,
}: ModalProps) {

  return (
    <div>
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
            height: "80%",
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: "20px",
            p: 4,
          }}
        >
          <CustomerForm
          />
        </Paper>
      </Modal>
    </div>
  );
}

export default CustomerEditorModal;