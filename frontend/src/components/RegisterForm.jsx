import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/users';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LoginLink from './LoginLink';

export default function RegisterForm(){
  const [state, setState] = useState({
    username : '',
    password : '',
    confirm_password : '',
    email : '',
    first_name: '',
    last_name: '',
    message : '',
  })

  const navigate = useNavigate();

  async function handleSubmit(event){
    event.preventDefault(); // Prevents page from reloading
    const data = await registerUser({
      username : state.username,
      password : state.password,
      confirm_password : state.confirm_password,
      email : state.email,
      first_name: state.first_name,
      last_name: state.last_name,
    })
    
    
    if(data.success){ //If registering works
      localStorage.setItem('authToken', data.token);
      // Navigate to dashboard
      navigate('/dashboard');
    }
    else{
      setState(prevState => ({
        ...prevState,
        message : data.message,
      }));
    }

  }
  return(
 
      <Box sx={{bgcolor: 'background.default', display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center'}}>
      <Card sx={{ boxShadow: 4, bgcolor: 'background.paper', display: 'flex', width: '100%', maxWidth: '400px', flexDirection: 'column', padding: 2}}>
        <CardContent sx={{gap: 4, display: 'flex', flexDirection: 'column',}}>
          <Typography component='h1' variant='h4' sx={{fontSize: 35, fontWeight: 'bold'}}>Register</Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: '100%' }}>
           
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ textAlign: 'left'}}>Username*</Typography>
                <TextField
                  value={state.username}
                  variant='outlined'
                  onChange={event => setState(prevState => ({...prevState, username : event.target.value}))}
                  autoFocus
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ textAlign: 'left'}}>First Name*</Typography>
                <TextField
                  value={state.first_name}
                  variant='outlined'
                  required
                  fullWidth
                  onChange={event => setState(prevState => ({...prevState, first_name: event.target.value}))}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ textAlign: 'left'}}>Last Name*</Typography>
                <TextField
                  value={state.last_name}
                  variant='outlined'
                  required
                  fullWidth
                  onChange={event => setState(prevState => ({...prevState, last_name: event.target.value}))}
                />
              </Box>
            </Box>
            
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ textAlign: 'left'}}>Password*</Typography>
                <TextField
                  value={state.password}
                  type='password'
                  onChange={event => setState(prevState => ({...prevState, password : event.target.value}))}
                  required
                  fullWidth
                  variant='outlined'
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ textAlign: 'left'}}>Confirm Password*</Typography>
                <TextField
                  type='password'
                  value={state.confirm_password}
                  variant='outlined'
                  required
                  fullWidth
                  onChange={event => setState(prevState => ({...prevState, confirm_password: event.target.value}))}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ textAlign: 'left'}}>Email*</Typography>
                <TextField
                  value={state.email}
                  type='email'
                  variant='outlined'
                  required
                  fullWidth
                  onChange={event => setState(prevState => ({...prevState, email: event.target.value}))}
                />
              </Box>
            </Box>
          </Box>
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{width: '100%'}}
          >
            <Button
              type='submit'
              variant='primary'
              sx={{width: '100%'}}
            >
              Register
            </Button>
          </Box>
        </CardContent>
        {state.message && <p>{state.message}</p>}
        <LoginLink />
      </Card>
      </Box>
 
  )
}