import { AppBar, Box, Toolbar,IconButton } from '@mui/material'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React,{ useState, useEffect } from 'react'
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { UserDropdown } from './UserDropdown';
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { LogoutUser } from './LogoutUser';
import { useStyles } from '../../styles'

// const theme = createTheme({
//     palette:{
//         primary:{
//             main:"#E74E35"
//         },
//         secondary: {
//             main: "#FFFFFF",
//           },
//     },
//     typography:{
//         fontFamily:"Lato"
//     }
// })


export const NavBar = ()=>{
    //hardcoded categories to show as example
    const categories = ["Breakfast", "Burgers", "Chicken", "Healthy", "Italian", "Indian", "Pizza", "Sushi"]
    const user = useSelector((state) => state.auth);
    const classes = useStyles();

      //DROPDOWN MENU FOR LOGGED IN USER
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
    return(
        <div>
            {/* <ThemeProvider theme={theme}> */}
            <Box sx={{ flexGrow: 1 }}>
            <AppBar 
              className={classes.root} 
              position="fixed" 
              sx={{
                height:"70px",
                backgroundColor: "#E74E35"
              }} 
            >
                <Toolbar>
                    <Link to="/">
                    <Box component={"img"}
                      src={"pictures/Logo.png"}
                      sx={{
                        height:62,
                        width:190,
                        marginTop:0.5,
                        marginLeft:1
                      }}
                    />
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    {user.firstName ? (
                        <>
                        <Box
                          sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                        >
                        <IconButton
                          size="large"
                          edge="end"
                          className={classes.navBar}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                          sx={{ 
                            borderRadius: 2, 
                            marginRight:8,  
                            '& .MuiSvgIcon-root': {
                              fill: "#FFF"
                            }
                          }}
                        >
                          <AccountBoxIcon />
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              marginLeft: .5,
                              fontSize: "15px",
                              fontFamily: "Lato",
                              letterSpacing: "0.1rem",
                              color: "#FFF"
                            }}
                          >
                            {user.firstName.toUpperCase()}
                          </Typography>
                        </IconButton>
                      </Box>
                    {/* //this is the dropdown menu after you click the button */}
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <UserDropdown user={user} />
                      <Divider />
                      <LogoutUser/>
                    </Menu>
                    </>
                    ) : (
                        <Link to="login" style={{ textDecoration: 'none' }}>
                    <Typography
                    variant="p"
                    component="div"
                    className={classes.navBar}
                    // color="secondary"
                    sx={{
                      fontSize: "20px",
                      marginLeft: 1,
                      marginRight: 6,
                      fontFamily: "Lato",
                      letterSpacing: "0.1rem",
                      border:"solid 1px white",
                      padding:"10px"
                    }}
                  >
                    LOGIN
                  </Typography>
                  </Link>
                    )}
                    
                </Toolbar>
            </AppBar>
            <Box component={"div"} sx={{ height: "70px" }} />
            </Box>
            {/* </ThemeProvider> */}
        </div>
    )
}