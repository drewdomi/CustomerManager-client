import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type AlertProps = {
  alertHandleConfirm?: () => void,
  alertHandleCancel?: () => void,
  type: "warn" | "success" | "error",
  alertMessage?: string;
};

export default function CustomAlert({
  alertHandleConfirm,
  alertHandleCancel,
  alertMessage,
  type,
}: AlertProps) {
  if (type === "success") {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">{alertMessage}</Alert>
      </Stack>
    );
  }

  if (type === "error") {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{alertMessage}</Alert>
      </Stack>
    );
  }

  if (type === "warn") {
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
          {alertMessage}
        </Alert>
      </Stack>
    );
  }
}