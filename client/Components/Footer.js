import React from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


  

function Copyright() {
    return (
      <Typography variant="body2" color="red" align="center" fontFamily="Lato">
        {'Copyright © '}
        <Link color="inherit" href="https://www.copyright.gov/">
          OmniGrub
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export const Footer = () =>{

    return(
        <Box sx={{ bgcolor: '#FFFFFFF', p: 3, marginTop:"auto"}} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="red"
          component="p"
          fontFamily="Lato"
        >
          Kenneth Rosas + Daniel Cho + Sara Ro + Nicolas Baez
        </Typography>
        <Copyright />
      </Box>
    )
}

// borderTop:"ridge 1px gray"}