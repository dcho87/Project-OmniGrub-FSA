import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
fontFamily:"Lato"
  };

export const PageNotFound = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        marginTop: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box component={"h1"} sx={{fontFamily:"Lato"}}>Page not found!</Box>
        <Box component={"h4"}sx={{fontFamily:"Lato"}}>
          Sorry, but the page you were looking for could not be found.
        </Box>
        <Box component={"div"} sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ fontFamily:"Lato",marginRight: 0.5 }}>{"You can "}</Box>
          <Link to={"/"} style={linkStyle}>return to our homepage</Link>
          <Box sx={{ fontFamily:"Lato", marginLeft: 0.5 }}>
            if you can't find what you're looking for.
          </Box>
        </Box>
      </Box>
    <Box
            component={"img"}
            src={"pictures/food-cartoon.jpeg"}
            sx={{ height: 420, width: 360, marginTop: 6 }}
          />
    </Box>


  );
};
