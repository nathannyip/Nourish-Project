import React from 'react';
import Card  from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { useUser } from '../context/UserContext';
import Box from '@mui/material/Box';

export default function CalorieCard(){
  const {user, loading, daily_nutrition } = useUser();
  if(loading) return;
  const calories = user?.profile?.calories || 2000;
  const progress = Math.min((daily_nutrition.calories / calories) * 100, 100);
  return (
    <Card sx={{px:1, height: 140}}>
      <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%'}}>
        <Typography variant= 'caption'>Calories</Typography>
        <Typography variant= 'h4' sx={{fontWeight: 600, my: 1, color: 'text.main'}}>{daily_nutrition?.calories?.toLocaleString()}</Typography>
        <Box sx={{width: '100%', display: 'flex'}}>
        <LinearProgress sx= {{
          width: '85%',
          height: 15,
          borderRadius: 5,
          backgroundColor: 'background.default',
          '& .MuiLinearProgress-bar': {background: 'linear-gradient(to left, #9c45ec, #a945ef, #b644f2, #c243f5, #cf42f8)'},
        }}variant= 'determinate' value= {progress}></LinearProgress>
        <Typography sx={{mr: 2}}variant= 'caption'>{Math.floor(progress)}%</Typography>
        </Box>
        <Typography sx={{}} variant = 'caption'>{`of ${calories?.toLocaleString()} goal`}</Typography>
      </CardContent>
    </Card>
  )
}