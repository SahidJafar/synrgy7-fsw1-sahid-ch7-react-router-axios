import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchComponent from "../../components/Elements/Search";
import CardCarsComponent from "../../components/Fragments/Card/dashboard/cardCars";
import axiosInstance from "../../services/service";
import NavbarLayout from "../../components/Layouts/navbar";
import ButtonComponent from "../../components/Elements/Button";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const DashboardPage = () => {
  const [result, setResult] = useState("");
  const [cars, setCars] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const getListCars = (callback) => {
    const token = localStorage.getItem("token");
    axiosInstance
      .get("cars", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        callback(res.data.data);
        // const carList = res.data.data ? res.data.data : ["Data Belum tersedia"];
        // setCars(carList);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  };

  const getUsername = (token) => {
    const decode = jwtDecode(token);
    return decode.name;
  };

  const handleNavigate = () => {
    navigate("/dashboard/cars/add");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsername(getUsername(token));
    }
  }, []);

  useEffect(() => {
    getListCars((data) => {
      setCars(data);
    });
  }, []);

  return (
    <>
      <NavbarLayout childrenLabel="Dashboard" variantButton="contained" colorButton="error" childrenButton="Logout" username={username} />
      <Container sx={{ mt: 5 }}>
        <Stack direction="row">
          <SearchComponent setResult={setResult} result={result} />
          <ButtonComponent variant="contained" children="Add Data" onClick={handleNavigate} />
        </Stack>
        <CardCarsComponent result={result} cars={cars} />
      </Container>
    </>
  );
};

export default DashboardPage;
