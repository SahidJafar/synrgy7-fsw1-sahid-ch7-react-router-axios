import { Typography } from "@mui/material";

const TypographyComponent = (props) => {
  const { children, variant } = props;
  return (
    <Typography component="div" variant={variant} sx={{ flexGrow: 1 }}>
      {children}
    </Typography>
  );
};
export default TypographyComponent;
