import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, logout } from "../../store";
import { Link, useNavigate } from "react-router-dom";

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

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(authenticate(data, "login"));
      navigate("/")
    } catch (ex) {
      console.log(ex);
    }
  };

  //   const onLogout = ()=>{

  //         dispatch(logout())

  //   }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            component={"img"}
            src={"pictures/Logo-Red.jpeg"}
            sx={{ height: 120, width: 360, marginTop: 6 }}
          />
          <Box component="h1" sx={{ fontFamily: "Lato", marginTop: 6 }}>
            Welcome Back OmniGrubber!
          </Box>
          <Box component="div" sx={{ maxWidth: "380px" }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ marginTop: 3 }}
              key={1}
            >
              <Grid container spacing={3}>
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
                  >
                    Log in
                  </Button>
                </Grid>
                {/* <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"

                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Logout
                </Button> */}
              </Grid>
            </Box>
          </Box>
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "450px",
              marginTop: 4,
              marginBottom: 4,
            }}
          >
            <Box
              component="div"
              sx={{
                flexGrow: 1,
                backgroundColor: "#D1D5DB",
                height: "0.125rem",
              }}
            />
            <Box
              component="div"
              sx={{
                flexGrow: 0,
                marginLeft: "1.25rem",
                marginRight: "1.25rem",
                color: "#8b8f94",
                fontFamily:"Lato"
              }}
            >
              {" "}
              OR{" "}
            </Box>
            <Box
              component="div"
              sx={{
                flexGrow: 1,
                backgroundColor: "#D1D5DB",
                height: "0.125rem",
              }}
            />
          </Box>
          <Box component="div" sx={{ width: "380px" }}>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
            >
              Sign up
            </Button>
            </Link>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};
