import { AppBar, Box, Toolbar } from '@mui/material'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from 'react'
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";


const theme = createTheme({
    palette:{
        primary:{
            main:"#E74E35"
        },
        secondary: {
            main: "#FFFFFF",
          },
    },
    typography:{
        fontFamily:"Lato"
    }
})

export const NavBar = ()=>{
    return(
        <div>
            <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{height:"70px"}} color="primary">
                <Toolbar>
                    <Link to="/">
                    <Box component={"img"}
                    src={"pictures/Logo.png"}
                    sx={{height:62,
                    width:190,
                    marginTop:0.5,
                    marginLeft:1}}/>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Link to="login" style={{ textDecoration: 'none' }}>
                    <Typography
                    variant="p"
                    component="div"
                    color="secondary"
                    sx={{
                      fontSize: "20px",
                      marginLeft: 1,
                      marginRight: 2,
                      fontFamily: "Lato",
                      letterSpacing: "0.1rem",
                    }}
                  >
                    LOGIN
                  </Typography>
                  </Link>
                </Toolbar>
            </AppBar>
            <Box component={"div"} sx={{ height: "70px" }} />
            </Box>
            </ThemeProvider>
        </div>
    )
}