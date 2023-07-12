import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type AlertProps = {
  alertToggleOpen?: boolean;
  alertWarning?: boolean,
  customerName?: string,
  alertHandleConfirm?: () => void,
  alertHandleCancel?: () => void,
};

export default function CustomAlert({
  alertToggleOpen,
  alertWarning,
  customerName,
  alertHandleConfirm,
  alertHandleCancel,
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
        <Stack sx={{
          width: '100%',
          position: "sticky",
          top: "70px",
          zIndex: 2,
        }} spacing={2}>
          <Alert
            severity="warning"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            action={
              <>
                <Button
                  color="error"
                  variant="outlined"
                  size="small"
                  onClick={alertHandleConfirm}
                  sx={{
                    marginRight: "10px",
                  }}
                >
                  Sim
                </Button>
                <Button
                  color="warning"
                  size="small"
                  onClick={alertHandleCancel}
                >
                  Não
                </Button>
              </>
            }
          >
            Deseja Excluir: <strong>{customerName}</strong>
          </Alert>
        </Stack>
    );
  }
}