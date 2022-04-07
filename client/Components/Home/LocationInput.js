import React from "react";
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Paper, IconButton, InputBase, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
// import { getGoogleRestaurant, reverseGeocode, findNearby } from '../store';

const LocationInput = ({ zip, geoCode, onChange, onSubmit }) => {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <IconButton 
        sx={{ p: "10px" }} 
        aria-label="menu"
        onClick={() => {
          geoCode();
        }}
      >
        <LocationOnIcon
          // onClick={() => {
          //   geoCode();
          // }}
        />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Your location... (zipcode, address)"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(ev) => onChange(ev)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        disabled={zip.length < 5}
        onClick={(ev) => onSubmit(ev)}
      >
        <SearchIcon />
      </IconButton>
      {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                <DirectionsIcon />
            </IconButton> */}
    </Paper>
  );
};

export default LocationInput;
