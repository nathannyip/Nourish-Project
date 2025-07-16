import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';

export default function LogCard({meal}){
  const formatted = new Date(meal.date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Box sx={{display: 'flex', flexDirection: 'row', bgcolor: 'background.light', width: '100%', p: 2, borderRadius: 2}}>
      <Box sx= {{width: '90%'}}>
        <Typography fontWeight = {600}>{meal.title}</Typography>
        <Typography variant ='caption'>{formatted}</Typography>
      </Box>
      <Box sx= {{}}>
        <Typography fontWeight= {600}>{meal.calories}</Typography>
        <Typography sx={{color: 'text.tertiary', fontSize: 12}}variant= 'caption'>calories</Typography>
      </Box>
    </Box>
  )
}