import { Paper, Typography, Box, FormControl, TextField, InputAdornment } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function CustomerSearch() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
        margin: "auto",
        gap: "15px",
      }}
    >
      <Typography
        variant='h2'
        fontSize="28px"
        fontWeight="Bold"
      >
        Pesquisar Cliente
      </Typography>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          gap: "10px",
          padding: "15px",
        }}
      >
        <FormControl
          sx={{
            display: "flex",
            flexGrow: 1,
          }}
        >
          <TextField
            placeholder="Nome"
            size='small'
            onChange={e => console.log(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Paper>
    </Box>
  );
}

export default CustomerSearch;