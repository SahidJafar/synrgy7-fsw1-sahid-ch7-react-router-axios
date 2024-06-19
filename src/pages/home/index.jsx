import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardCarsComponent from "../../components/Fragments/Card/home/cardCars";
import SearchComponent from "../../components/Elements/Search";
import axiosInstance from "../../services/service";
import NavbarLayout from "../../components/Layouts/navbar";

const HomePage = () => {
  const [result, setResult] = useState("");
  const [cars, setCars] = useState([]);

  const getListPublicCars = (callback) => {
    axiosInstance
      .get("cars/public")
      .then((res) => {
        callback(res.data.data);
        // const carList = res.data.data ? res.data.data : [];
        // setCars(carList);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  };

  useEffect(() => {
    getListPublicCars((data) => {
      setCars(data);
    });
  }, []);

  return (
    <>
      <NavbarLayout childrenLabel="Binar Car Rental" variantButton="outlined" colorButton="inherit" childrenButton="Dashboard" />
      <Container sx={{ mt: 5 }}>
        <SearchComponent setResult={setResult} result={result} />
        <CardCarsComponent result={result} cars={cars} />
      </Container>
    </>
  );
};

export default HomePage;
