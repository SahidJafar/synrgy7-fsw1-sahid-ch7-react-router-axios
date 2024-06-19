import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import TypographyComponent from "../Elements/Label";
import ButtonComponent from "../Elements/Button";
import { Typography } from "@mui/material";

export default function NavbarLayout(props) {
  const { childrenLabel, variantButton, colorButton, childrenButton, username } = props;
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Arahkan pengguna ke halaman login setelah logout
  };

  const handleButtonClick = () => {
    if (childrenButton === "Logout") {
      handleLogout();
    } else if (childrenButton === "Dashboard") {
      handleNavigate();
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <TypographyComponent variant="h6" component="div" children={childrenLabel} />
          <Typography component="h5" variant="h6" color="inherit" sx={{ fontSize: "1rem", mr: 2 }}>
            {username}
          </Typography>
          <ButtonComponent variant={variantButton} color={colorButton} children={childrenButton} onClick={handleButtonClick} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
