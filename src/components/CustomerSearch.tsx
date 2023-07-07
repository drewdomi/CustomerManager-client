import { Typography, Box, FormControl, TextField, InputAdornment } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          boxShadow: "0 1px 4px #000000aa",
          padding: "15px",
          borderRadius: 2,
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
      </Box>
    </Box>
  );
}

export default CustomerSearch;