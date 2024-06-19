import { Button } from "@mui/material";

const ButtonComponent = (props) => {
  const { children, variant, color, onClick } = props;
  return (
    <Button variant={variant} color={color} sx={{ width: "120px" }} onClick={onClick}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
