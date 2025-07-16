import React from 'react';
import  Drawer  from '@mui/material/Drawer';
import MenuContent from './MenuContent';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useUser } from '../context/UserContext';
import AvatarButton from './AvatarButton';
import Divider from '@mui/material/Divider';




const drawerWidth = 240;

export default function SideMenu({onViewChange}){
  const {user} = useUser();
  return(
    <Drawer sx= {{
      width: drawerWidth,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper'
          },
      }}
      variant= 'permanent'
      anchor= 'left'>
      <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <MenuContent onViewChange = {onViewChange}/>
        <Box sx={{marginTop: 'auto', mb:2}}>
          <Divider sx={{mb: 2}}></Divider>
          <Stack direction= 'row'>
            <AvatarButton onViewChange = {onViewChange}/>
            <Box sx={{mr: 4, display: 'flex', flexDirection: 'column', }}>
              <Typography sx={{fontSize: 14, textAlign: 'left', fontWeight: 600}}>{`${user.first_name} ${user.last_name}`}</Typography>
              <Typography sx={{fontSize: 13}}>{user.email}</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  )
}