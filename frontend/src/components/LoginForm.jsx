import React, { useState } from 'react';
import { loginUser } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RegisterLink from './RegisterLink';


export default function LoginForm() {
  const [state, setState] = useState({
    username: '',
    password: '',
    message: '',
  });


  const navigate = useNavigate();
  const { setState : setUserState } = useUser();

  async function handleSubmit(event) {

    event.preventDefault(); // Prevents the page from reloading after submitting
    console.log('Login attempt started');
    
    const data = await loginUser({ username: state.username, password: state.password });
    console.log('Login response:', data);
    
    if (data.success) {
      console.log('Login successful, fetching user data...');
      
      // Fetch updated user data after successful login
      try {
        const userResponse = await fetch('/users/api/me/', { credentials: 'include' });
        console.log('User response status:', userResponse.status);
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log('User data received:', userData);
          
          setUserState(prevState => ({
            ...prevState,
            user: userData,
            loading: false
          }));
          console.log('UserContext updated with user data');
        } else {
          console.log('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      
      console.log('Navigating to dashboard...');
      // Redirect to dashboard
      navigate('/dashboard');

    } else {
      setState(prevState => ({ ...prevState, message: data.message }));
    }
  }

  return (

      <Box
        sx = {{bgcolor: 'background.default', display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center',}}>
          <Card 
          sx ={{ boxShadow: 4, bgcolor: 'background.paper', display: 'flex', width: '100%',maxWidth: '400px', flexDirection: 'column', padding: 2,}}>
            <CardContent sx={{gap:4, display: 'flex', flexDirection: 'column'}}> 
              <Typography component='h1' variant='h4' sx ={{fontSize: 35, fontWeight: 'bold'}} >Sign in</Typography>
              <Box 
                component='form'
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography sx={{ textAlign: 'left' }}>Username</Typography>
                  <TextField
                    color = 'primary'
                    autoFocus
                    value={state.username}
                    onChange={event => setState(prevState => ({ ...prevState, username: event.target.value }))}
                    fullWidth
                    required
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
                  <Typography  sx={{textAlign: 'left'}}>Password</Typography>
                  <TextField
                    type="password"                
                    value={state.password}
                    onChange={event => setState(prevState => ({ ...prevState, password: event.target.value }))}
                    fullWidth
                    required
                  />
                </Box>
                <Button
                  variant='primary'
                  type='submit'
                  sx={{ mt: 3 }}
                >
                  Sign in
                </Button>
              </Box>
              {state.message && <p>{state.message}</p>}
              <RegisterLink />
                  </CardContent>
          </Card>
      </Box>
      

  );
}

