import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useUser } from '../context/UserContext';
import MainGrid from '../components/MainGrid';

export default function Home(){
  const {user} = useUser();

  return(
    <Box sx= {{width: '100vw', minHeight: '100vh'}}>
      <Box display= 'flex' flexDirection= 'column' alignItems= 'flex-start' sx={{ background: 'background.default', ml: 5, mt: 5, mr: 4 , height: '100vh'}}>
        <Typography variant= 'h4' sx={{fontWeight: 600, mb: 1}}>{`Welcome, ${user.username}!`}</Typography>
        <Typography variant= 'h6' sx={{fontSize: 14, mb: 2}}>Track your nutrition and health goals</Typography>  
        <MainGrid />
      </Box>
    </Box>
  )
}