import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import Typography from '@mui/material/Typography';
 

export default function RegisterLink(){
  return (
    <div>
      <Typography variant= 'h6' fontWeight= {600} mb={2}>Don't have an account?</Typography>
      <MuiLink 
        component={RouterLink}
        to='/register'
        sx={{ 
          color: 'text.tertiary',
          fontWeight: 'bold',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        Register here
      </MuiLink>
    </div>
  );
}

