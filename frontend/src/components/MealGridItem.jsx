import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function MealGridItem({macro, value}){
  const macroColors = {
    'protein': {text: 'text.tertiary'},
    'carbs': {text: 'text.tertiary', background: '#7c4dff' },
    'fat': {text: 'text.tertiary'},
    'calories': {text: 'text.tertiary'},
  }

  const color = macroColors[macro.toLowerCase()] || macroColors.calories;

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 1.5, borderRadius: 1,  bgcolor: 'background.light', height: 40, justifyItems: 'center'}}>
      <Typography color= {'text.primary'} fontWeight= '900' variant= 'h6'>{value}g</Typography>
      <Typography color = {color.text} variant= 'caption'>{macro}</Typography>
    </Box>
  )
}