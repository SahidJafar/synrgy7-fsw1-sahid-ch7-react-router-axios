import React from "react";
import { Container, Grid } from "@mui/material";

const SearchComponent = ({ setResult, result }) => {
  const handleChange = (valueInput) => {
    setResult(valueInput);
  };

  return (
    <Container>
      <Grid container justifyContent="center" direction="column">
        <Grid item>
          <input onChange={(e) => handleChange(e.target.value)} value={result} placeholder="Search Car" />
        </Grid>
      </Grid>
    </Container>
  );
};
export default SearchComponent;
