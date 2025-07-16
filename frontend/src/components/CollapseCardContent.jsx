import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CardContent from '@mui/material/CardContent';
import KitchenIcon from '@mui/icons-material/Kitchen';
import { ListItemText } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Divider from '@mui/material/Divider';

export default function CollapseCardContent({meal}){
  let instructions = meal.instructions.split('\n').map((instruction) => (instruction.trim())).filter(instruction => instruction.length > 0);
  let ingredients = meal.ingredients.split('\n').map((ingredient) => (ingredient.trim())).filter(ingredient => ingredient.length >0);

  return(
    <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} >
      <Typography variant="h5" ><KitchenIcon /> Instructions:</Typography>
      <Box ml={3}>
        
        <List sx={{listStyleType: 'decimal'}} >
          {instructions.map((instruction, index) => (
                         <ListItem sx={{display: 'list-item', paddingLeft: 1}} key= {index}>
              <ListItemText primary= {instruction}></ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider variant= 'full'></Divider>
      <Typography variant="h5" ><MenuBookIcon /> Ingredients:</Typography>
        <Box sx={{ ml:3 }}>
        <List sx={{listStyleType: 'disc'}}>
          {ingredients.map((ingredient, index)=>(
                         <ListItem sx={{display: 'list-item', paddingLeft: 1}} key= {index}>
              <ListItemText primary= {ingredient}></ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </CardContent>
  )
}