import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Divider } from "@mui/material";

export const UserDropdown = (props) =>{
    const navigate = useNavigate();
    const {user} = props
    return(
        <div>
            <Link to="favorites" style={{textDecoration:"none"}}>
            <MenuItem>
              <FavoriteIcon 
                // color="primary"
                className=".fav"
                sx={{ 
                  height: "40px", 
                  width: "30px", 
                  marginRight: 1, 
                  fill: "#E74E35"

                }} 
              />
              <Typography
                sx={{
                  fontFamily: "lato",
                  marginLeft: 0.5,
                  color: "black",
                }}
              >
                Favorites
              </Typography>
            </MenuItem>
          </Link>
          <Divider />
          <Link to="account" style={{textDecoration:"none"}}>
            <MenuItem>
              <Avatar  fontSize="small"sx={{ height: "30px", width: "30px", marginRight: 1,marginTop:1,marginBottom:1}} />
              <Typography
                sx={{
                  fontFamily: "lato",
                  marginLeft: 0.5,
                  color: "black",
                }}
              >
                Account
              </Typography>
            </MenuItem>
          </Link>
        </div>
    )
}