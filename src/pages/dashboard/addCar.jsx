import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, IconButton, Input, Radio, RadioGroup, Snackbar, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavbarLayout from "../../components/Layouts/navbar";
import { jwtDecode } from "jwt-decode";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AddCircleRounded, RemoveCircleRounded } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../../services/service";
import { useNavigate } from "react-router";

const AddCarPage = () => {
  const [username, setUsername] = useState("");
  const [optionsFields, setOptionsFields] = useState([""]);
  const [specsFields, setSpecsFields] = useState([""]);
  const [image, setImage] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const form = useForm();
  const { register, handleSubmit, control, setValue } = form;

  const getUsername = (token) => {
    const decode = jwtDecode(token);
    return decode.name;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsername(getUsername(token));
    }
  }, []);

  const handleChangeOptionsInput = (index, event) => {
    const newOptionsFields = [...optionsFields];
    newOptionsFields[index] = event.target.value;
    setOptionsFields(newOptionsFields);
    setValue(`options.${index}`, event.target.value); // Update form value
  };

  const handleChangeSpecsInput = (index, event) => {
    const newSpecsFields = [...specsFields];
    newSpecsFields[index] = event.target.value;
    setSpecsFields(newSpecsFields);
    setValue(`specs.${index}`, event.target.value); // Update form value
  };

  const handleAddOptionsFields = () => {
    setOptionsFields([...optionsFields, ""]);
    setValue("options", [...optionsFields, ""]); // Update form value
  };

  const handleAddSpecsFields = () => {
    setSpecsFields([...specsFields, ""]);
    setValue("specs", [...specsFields, ""]); // Update form value
  };

  const handleRemoveOptionsFields = (index) => {
    const newOptionsFields = optionsFields.filter((field, i) => i !== index);
    setOptionsFields(newOptionsFields);
  };

  const handleRemoveSpecsFields = (index) => {
    const newSpecsFields = specsFields.filter((field, i) => i !== index);
    setSpecsFields(newSpecsFields);
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("plate", data.plate);
      formData.append("manufacture", data.manufacture);
      formData.append("model", data.model);
      formData.append("rent_per_day", data.rent_per_day);
      formData.append("capacity", data.capacity);
      formData.append("description", data.description);
      formData.append("available_at", data.available_at);
      formData.append("transmission", data.transmission);
      formData.append("available", data.available);
      formData.append("type", data.type);
      formData.append("year", data.year);

      data.options.forEach((option, index) => formData.append(`options[${index}]`, option));
      data.specs.forEach((spec, index) => formData.append(`specs[${index}]`, spec));

      formData.append("image", data.image[0]);

      const response = await axiosInstance.post("cars", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.data);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false); // Close success popup
    navigate("/dashboard"); // Navigate back to dashboard after closing popup
  };

  return (
    <>
      <NavbarLayout childrenLabel="Dashboard" variantButton="contained" colorButton="error" childrenButton="Logout" username={username} />
      <Container
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography component="h1" variant="h5">
          Form Add Car
        </Typography>
        <Box sx={{ mt: 3 }}>
          <FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Plate :</FormLabel>
                <TextField required {...register("plate")}></TextField>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Manufacture :</FormLabel>
                <TextField required {...register("manufacture")}></TextField>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Model :</FormLabel>
                <TextField required {...register("model")}></TextField>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Rent per day :</FormLabel>
                <TextField required {...register("rent_per_day")}></TextField>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Capacity :</FormLabel>
                <TextField required {...register("capacity")}></TextField>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Description :</FormLabel>
                <TextField required multiline rows={2} {...register("description")} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Available at :</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller name="available_at" control={control} render={({ field }) => <DatePicker {...field} textField={<TextField {...field} />} />} />
                </LocalizationProvider>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Transmission :</FormLabel>
                <Controller
                  name="transmission"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="manual" control={<Radio />} label="manual" />
                      <FormControlLabel value="automatic" control={<Radio />} label="automatic" />
                    </RadioGroup>
                  )}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Available :</FormLabel>
                <Controller
                  name="available"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup row {...field}>
                      <FormControlLabel value="true" control={<Radio />} label="true" />
                      <FormControlLabel value="false" control={<Radio />} label="false" />
                    </RadioGroup>
                  )}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Type :</FormLabel>
                <TextField required {...register("type")}></TextField>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Year :</FormLabel>
                <TextField required {...register("year")}></TextField>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Options :</FormLabel>
                <Stack spacing={1}>
                  {optionsFields.map((option, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                      <TextField required {...register(`options.${index}`)} label="Options" value={option} onChange={(event) => handleChangeOptionsInput(index, event)} />
                      <IconButton disabled={optionsFields.length === 1 || index === 0} onClick={() => handleRemoveOptionsFields(index)}>
                        <RemoveCircleRounded />
                      </IconButton>
                      <IconButton onClick={handleAddOptionsFields}>
                        <AddCircleRounded />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Specs :</FormLabel>
                <Stack spacing={1}>
                  {specsFields.map((spec, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                      <TextField required {...register(`specs.${index}`)} label="Specs" value={spec} onChange={(event) => handleChangeSpecsInput(index, event)} />
                      <IconButton disabled={specsFields.length === 1 || index === 0} onClick={() => handleRemoveSpecsFields(index)}>
                        <RemoveCircleRounded />
                      </IconButton>
                      <IconButton onClick={handleAddSpecsFields}>
                        <AddCircleRounded />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormLabel sx={{ width: "150px" }}>Image :</FormLabel>
                <Stack spacing={1}>
                  <Input required type="file" {...register("image")} onChange={handleChangeImage} />
                  <Button variant="outlined" onClick={() => setImage(null)}>
                    Clear Image
                  </Button>
                  {image && <img src={image} alignItems="center" alt="preview" width={200} />}
                </Stack>
              </Box>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Add Data
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </Container>
      <Snackbar
        open={showSuccessPopup}
        autoHideDuration={3000} // Adjust duration as needed
        onClose={handleCloseSuccessPopup}
        message="Data successfully added!"
        // Add additional props as needed for styling
      />
    </>
  );
};

export default AddCarPage;
