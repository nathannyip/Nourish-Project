import React from 'react';
import Card  from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

export default function MacroCard({macroItem}){
  const progress = Math.min((macroItem.value / macroItem.goal) * 100, 100);
  const macroTitle = macroItem.title.charAt(0).toUpperCase() + macroItem.title.slice(1).toLowerCase();
  const color = {
    
  }
  
  return (
    <Card sx={{px:1, height: 140, bgcolor: 'background.paper'}}>
      <CardContent sx= {{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%'}}>
      <Typography variant= 'caption'>{macroTitle}</Typography>
        <Typography variant= 'h4' sx={{fontWeight: 600, my: 1}}>{macroItem.value}g</Typography>
        <Box sx={{width: '100%', display: 'flex'}}>
          <LinearProgress sx= {{
            width: '85%',
            height: 15, 
            borderRadius: 5,
            '& .MuiLinearProgress-bar': {background: 'linear-gradient(to left, #9c45ec, #a945ef, #b644f2, #c243f5, #cf42f8)'},
            backgroundColor: 'background.default'
          }}
          variant= 'determinate' value= {progress}></LinearProgress>
          <Typography sx={{mr:2}}variant= 'caption'>{Math.floor(progress)}%</Typography>
        </Box>
        <Typography sx={{mr:2}}variant = 'caption'>{`of ${macroItem.goal}g goal`}</Typography>
      </CardContent>
    </Card>
  )
}