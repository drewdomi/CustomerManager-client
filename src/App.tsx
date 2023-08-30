import { Box } from "@mui/material";
import Router from "./Router";
import SideBar from "./components/SideBar";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
        margin: "auto",
        gap: "15px",
        padding: "20px 15px 0"
      }}
    >
      <SideBar />
      <Router />
    </Box>

  );
}

export default App;
