import React from 'react';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


export default function MenuContent({onViewChange}){
  const MainListItems= [
    {text: 'Home', icon: <HomeIcon />, view : 'home'},
    {text: 'Meals', icon: <RestaurantIcon/>, view : 'meals'}
  ]
  return(
    <Stack>
      <List>
        {MainListItems.map(item => (
            <ListItem key= {item.text}>
            <ListItemButton sx={{bgcolor: 'background.light', '&.active': {bgcolor: 'background.light'}, borderRadius: 2}} onClick = {()=> onViewChange(item.view)}>
              <ListItemIcon sx={{color: 'secondary.main', width: 8, height: 27, mr: -2}}>{item.icon}</ListItemIcon>
              <ListItemText primary= {item.text} />
            </ListItemButton>
          </ListItem>
          ))
        }
      </List>
    </Stack>

  )
}