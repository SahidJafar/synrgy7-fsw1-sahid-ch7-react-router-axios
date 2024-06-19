import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Navigate to dashboard if token exists
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmitLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axiosInstance.post("users/login", { email, password });
      if (response.data.status === "success") {
        // Save the token in local storage
        localStorage.setItem("token", response.data.data.token);
        // Navigate to the dashboard
        navigate("/dashboard");
      } else {
        // Show an alert if the login was not successful
        setLoginFailed(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error Login:", error);
      setLoginFailed(error.response.data.message || "Login failed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {loginFailed && (
          <Typography component="h5" variant="h6" color="error" sx={{ fontSize: "1rem" }}>
            {loginFailed}
          </Typography>
        )}

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmitLogin}>
          <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
