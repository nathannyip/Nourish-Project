import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export default function LoginLink(){
  return (
    <div>
      <h2>Already have an account?</h2>
      <MuiLink 
        component={RouterLink}
        to='/login'
        sx={{ 
          color: 'text.tertiary',
          fontWeight: 'bold',
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        Sign in here
      </MuiLink>
    </div>
  );
} 