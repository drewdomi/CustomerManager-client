import { Typography } from "@mui/material";

type TitleProps = {
  children: string;
};

function Title({ children }: TitleProps) {
  return (
    <Typography
      variant='h2'
      fontSize="28px"
      fontWeight="Bold"
    >
      {children}
    </Typography>
  );
}

export default Title;