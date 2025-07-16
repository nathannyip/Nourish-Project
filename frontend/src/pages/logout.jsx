import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout'; 


export default function Logout(){
  return(
    <Box
        sx = {{bgcolor: 'background.default', display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center',}}>
          <Card 
          sx ={{ boxShadow: 6, bgcolor: 'background.paper', display: 'flex', width: '100%',maxWidth: '400px', flexDirection: 'column', padding: 2, borderRadius: 2,}}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}> 
            <LogoutIcon sx={{ fontSize: 60, color: 'primary.main', alignSelf: 'center', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
  You have been logged out
</Typography>
<Typography variant="subtitle1" sx={{ color: 'text.tertiary', mb: 3, textAlign: 'center' }}>
  We hope to see you again soon!
</Typography>
            <Button
  component={RouterLink}
  to="/login"
  variant="tertiary"
  color="text.secondary"
  sx={{ mt: 2, fontWeight: 'bold', borderRadius: 2 }}
>
  Log back in
</Button>
                  </CardContent>
          </Card>
      </Box>
  )
}