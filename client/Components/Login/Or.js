import React from 'react'
import { Box } from '@mui/material'

export const Or = ()=>{
    return(
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
    )
}