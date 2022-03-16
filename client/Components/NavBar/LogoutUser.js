import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch } from "react-redux";
import { logout } from "../../store";
import Logout from "@mui/icons-material/Logout";

export const LogoutUser = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return(
        <MenuItem
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          sx={{marginTop:1}}>
            <ListItemIcon>
              <Logout fontSize="medium"  />
            </ListItemIcon>
            <Typography
              sx={{
                fontFamily: "Lato",
                marginLeft: 0,
                color: "black",
              }}
            >
              Logout
            </Typography>
          </MenuItem>
    )
}