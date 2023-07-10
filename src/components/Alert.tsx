import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export type AlertProps = {
  alertToggleOpen: boolean,
  alertHandleOpen: () => void,
  alertHandleClose: () => void,
  alertTitle?: string,
};

function Alert({
  alertToggleOpen,
  alertHandleClose,
  alertTitle = "Alert Title",
}: AlertProps) {
  return (
    <div>
      <Dialog
        open={alertToggleOpen}
        onClose={alertHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {alertTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText  id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={alertHandleClose}
            variant="contained"
            startIcon={<CloseRoundedIcon/>}
            >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Alert;