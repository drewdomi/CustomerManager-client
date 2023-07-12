import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type AlertProps = {
  alertToggleOpen?: boolean,
};

export default function CustomAlert({ alertToggleOpen }: AlertProps) {
  if (alertToggleOpen) {
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="success">Sucesso</Alert>
      </Stack>
    );
  }
}