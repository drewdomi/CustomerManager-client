import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type AlertProps = {
  alertToggleOpen?: boolean
  alertWarning?: boolean,
  customerName: string,
  handleConfirm?: () => void,
};

export default function CustomAlert({
  alertToggleOpen,
  alertWarning,
  customerName,
  handleConfirm,
}: AlertProps) {
  if (alertToggleOpen) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">Sucesso</Alert>
      </Stack>
    );
  }
  if(alertWarning){
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleConfirm}
              >
              OK
            </Button>
          }
        >Deseja Excluir: <strong>{customerName}</strong></Alert>
      </Stack>
    )
  }
}