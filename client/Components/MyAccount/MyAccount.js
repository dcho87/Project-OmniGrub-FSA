import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector} from "react-redux";
import { MyAccountForm } from "./MyAccountForm";


export const MyAccount = () => {
  const profile = useSelector((state) => state.auth);

  return (
      <div>
        <CssBaseline />
        
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              minHeight: "100vh",
            }}
            component="div"
          >
            <Box component="h2" sx={{fontFamily:"Lato"}}>Account Information</Box>
            {profile ? (
            <MyAccountForm/>
            ) : <h3>Loading please wait..</h3>}
          </Box>
          </div>
  );
};

//state to disable button, as soon as change happens 
//flash message update
//