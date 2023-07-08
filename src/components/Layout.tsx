import { Box } from "@mui/material";
import SideBar from "./SideBar";

type PropsTypes = {
  children: JSX.Element;
};

function Layout({ children }: PropsTypes) {
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
      {children}
    </Box>
  );
}

export default Layout;