import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type AlertProps = {
  alertToggleOpen?: boolean;
  alertWarning?: boolean,
  customerName: string,
  handleConfirm?: () => void,
  handleCancel?: () => void,
};

export default function CustomAlert({
  alertToggleOpen,
  alertWarning,
  customerName,
  handleConfirm,
  handleCancel,
}: AlertProps) {
  if (alertToggleOpen) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">Sucesso</Alert>
      </Stack>
    );
  }
  if (alertWarning) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert
          severity="warning"
          action={
            <>
              <Button
                color="error"
                variant="outlined"
                size="small"
                onClick={handleConfirm}
                sx={{
                  marginRight: "10px",
                }}
              >
                Sim
              </Button>
              <Button
                color="warning"
                size="small"
                onClick={handleCancel}
              >
                Não
              </Button>
            </>
          }
        >Deseja Excluir: <strong>{customerName}</strong></Alert>
      </Stack>
    );
  }
}