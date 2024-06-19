import React from "react";
import { Button, Card, CardContent, CardHeader, CardMedia, Grid, Stack, Typography } from "@mui/material";
import axiosInstance from "../../../../services/service";
import { Link } from "react-router-dom";

const CardCarsComponent = ({ result, cars }) => {
  const filteredCars = cars.filter((car) => car.userDeleted === null);

  const handleDeleteCar = (id) => {
    const token = localStorage.getItem("token");
    axiosInstance
      .delete(`cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Update state or notify user of success
        console.log("Car deleted successfully:", response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      });
  };

  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      {filteredCars
        .filter((car) => car.manufacture.toLowerCase().includes(result.toLowerCase()))
        .map((car, i) => (
          <Grid item xs={4} key={i}>
            <Card>
              <CardHeader title={`${car.manufacture}`} subheader={`Plate: ${car.plate}`} />
              <CardMedia component="img" height="194" image={car.image} alt={`${car.manufacture} ${car.model}`} />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Model: {car.model}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Rent per day: {car.rent_per_day}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Capacity: {car.capacity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {car.type}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Transmission: {car.transmission}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Available at: {new Date(car.available_at).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {car.description}
                </Typography>
                <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
                  <Button component={Link} to={`/dashboard/cars/update/${car.id}`} variant="contained">
                    Update Data
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteCar(car.id)}>
                    Delete Data
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default CardCarsComponent;
