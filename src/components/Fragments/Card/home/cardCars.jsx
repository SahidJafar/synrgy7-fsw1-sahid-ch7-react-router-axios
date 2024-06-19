import React from "react";
import { Card, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";

const CardCarsComponent = ({ result, cars }) => {
  return (
    <Grid container spacing={3} sx={{ mt: 3 }}>
      {cars
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
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default CardCarsComponent;
