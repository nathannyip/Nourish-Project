import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { logoutUser } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';


export default function AvatarButton({onViewChange}){
  const [anchorEl, setAnchorEl] = useState(null);
  const {user} = useUser()
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { setState } = useUser();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () =>{
    setAnchorEl(null);
  }

  const handleLogout = async () => {
    const response = await logoutUser();
    if(response){
      setState({ user: null, loading: false });
      navigate('/logout');
    }
  };

  return(
    <React.Fragment>
      <IconButton
      onClick= {handleClick}
      sx= {{mx: 2}}>
       <Avatar sx={{width:32, height:32 }}>{user.username[0].toUpperCase()}</Avatar>
      </IconButton>
      <Menu
        anchorEl= {anchorEl}
        open= {open}
        onClose= {handleClose}
        onClick= {handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        >
      <MenuItem onClick= {() => onViewChange('profile')}>Profile</MenuItem>
      <MenuItem onClick= {handleLogout}>Log out</MenuItem>




      </Menu>
    </React.Fragment>

  )
}