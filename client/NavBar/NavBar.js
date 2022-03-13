import { AppBar, Box, Toolbar } from '@mui/material'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from 'react'

const theme = createTheme({
    palette:{
        primary:{
            main:"#E74E35"
        }
    },
    typography:{
        fontFamily:"Lato Regular"
    }
})

export const NavBar = ()=>{
    return(
        <div>
            <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{height:"70px"}} color="primary">
                <Toolbar>
                    <Box component={"img"}
                    src={"pictures/Logo.png"}
                    sx={{height:62,
                    width:190,
                    marginTop:0.5,
                    marginLeft:1}}/>
                    <Box sx={{ flexGrow: 1 }} />
                    
                </Toolbar>
            </AppBar>
            <Box component={"div"} sx={{ height: "70px" }} />
            </Box>
            </ThemeProvider>
        </div>
    )
}