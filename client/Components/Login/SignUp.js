import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, logout, authenticateGoog, oauth } from "../../store";
import { Link, useNavigate } from "react-router-dom";
import { Or } from "./Or";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { setflashMessage } from "../../store/flashMessage";
import { GoogleLogin } from "react-google-login";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E74E35",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Lato",
  },
});

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(authenticate(data, "signup")).then(() => {
        dispatch(setflashMessage(true, "success", "Welcome to OmniGrub!"));
      });
      navigate("/");
    } catch (ex) {
      console.log(ex);
    }
  };

  const onGoogleSuccess = async (response) => {
    const profile = response.profileObj;
    const data = {
      firstName: profile.givenName ? profile.givenName : "Unknown",
      lastName: profile.familyName ? profile.familyName : "Unknown",
      email: profile.email,
      googleId: profile.googleId,
    };
    try {
      await dispatch(oauth(data));
      navigate("/");
    } catch (ex) {
      console.log(ex);
    }
  };


  const onGoogleFailure = (response)=>{
      console.log(response)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Link to="/">
            <Box
              component={"img"}
              src={"pictures/Logo-Red.jpeg"}
              sx={{ height: 120, width: 360, marginTop: 6 }}
            />
          </Link>
          <Box component="h1" sx={{ fontFamily: "Lato", marginTop: 6 }}>
            Sign up free to start ordering from the best.
          </Box>
          <Box component="div" sx={{ maxWidth: "360px", justifyContent:"center", alignItems:"center", marginTop:3,marginBottom:3 }}>
            <GoogleLogin
              clientId={
                "390758873819-59alpn980k0o6j9h8itajot3ut0hq3ve.apps.googleusercontent.com"
              }
              buttonText="Sign Up or Sign In with Google"
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
            />
          </Box>
          <Or />
          <Box component="h2" sx={{ fontFamily: "Lato", marginTop: 1 }}>
            Sign up with your email address
          </Box>
          <Box component="div" sx={{ maxWidth: "380px" }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ marginTop: 3 }}
              key={1}
            >
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    autoFocus
                    {...register("firstName", { required: "Required field" })}
                    error={!!errors.firstName}
                    helperText={
                      errors.firstName ? errors.firstName.message : null
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    {...register("lastName", { required: "Required field" })}
                    error={!!errors.lastName}
                    helperText={
                      errors.lastName ? errors.lastName.message : null
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    autoFocus
                    {...register("email", {
                      required: "Required field",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : null}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register("password", { required: "Required field" })}
                    error={!!errors.password}
                    helperText={
                      errors.password ? errors.password.message : null
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginBottom: 6 }}
                  >
                    Sign up
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  {authError && authError.response && (
                    <div> {authError.response.data} </div>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};
