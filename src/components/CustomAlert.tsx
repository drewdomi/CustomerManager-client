import { Alert, Stack, Button } from '@mui/material';

export type AlertType = "success" | "warning" | "error";

type Props = {
  alertHandleConfirm?: () => void;
  alertHandleCancel?: () => void;
  alertMessage?: string;
  alertType?: AlertType;
};

type TypeAlert = {
  [key in AlertType]: JSX.Element;
};

export default function CustomAlert({
  alertHandleConfirm,
  alertHandleCancel,
  alertMessage,
  alertType = "success"
}: Props) {
  const typeAlert: TypeAlert = {
    success: (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">{alertMessage}</Alert>
      </Stack>
    ),
    error: (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="error">{alertMessage}</Alert>
      </Stack>
    ),
    warning: (
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
    )
  };

  return <>{typeAlert[alertType]}</>;
}
