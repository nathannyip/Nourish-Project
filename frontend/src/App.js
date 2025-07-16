import './App.css';
import Register from './pages/register'
import Login from './pages/login';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import PrivateRouter from './router/PrivateRouter';
import { ROUTES } from './router/routes';
import UserProvider from './context/UserContext';
import Profile from './pages/profile'
import Logout from './pages/logout'
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette :{
    background :{
      default: '#000000',     // Black
      paper: '#141414',       // Gray
      light: '#292929',       // Light Gray
    },
    primary: {
      main: '#9929EA',        // Purple
      light: '#CC66DA',       // Light purple
      neon: '#865DFF',        // Neon Purple
      dark: '#000000',        // Black
    },
    secondary: {
      main : '#FAEB92',       // Light Yellow
    },
    text: {
      primary: '#FFFFFF',     // White text
      secondary: '#CC66DA',   // Light purple
      tertiary: '#FAEB92',    // Light Yellow
    },
  },
  components: {
    MuiButton:{
      defaultProps:{
        disableRipple: true,
      },
     variants:[
        {
          props: { variant: 'primary' },
          style: {
            backgroundColor: '#141414',
            color: '#9929EA',
            borderColor: '#865DFF',
          }
        },
        {
          props: { variant: 'secondary' },
          style: {
            backgroundColor: 'transparent',
            color: 'white',
            '&:hover': {
              backgroundColor: '#865DFF',
            },
            '&:active': {
              backgroundColor: '#865DFF'
            }
          }
        },
        {
          props: {variant: 'tertiary'},
          style: {
            backgroundColor: '#9929EA',
            color: 'white',
          }
        }

      ]
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          //  Outline color
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#292929',
          }, // White text input
          '& .MuiInputBase-input': {
            color: 'white',
          }, // Background color of textfiedl
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#292929',
          }, // Focused outline color
          '&:hover .MuiOutlinedInput-notchedOutline':{
            borderColor: '#9929EA',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{
            borderColor: '#292929',
          }
          
        }
      }
    },
    MuiLinearProgress :{
      variants :[
        {
          props: {variant: 'Calories'},
          style: {
            backgroundColor: 'blue',
            '.MuiLinearProgress-bar' : {backgroundColor: 'red'}
          },
        },
        {
          props: {variant: 'Protein'},
          style: {
            '& .MuiLinearProgress-bar' : {backgroundColor: '#66bb6a', }
          },
        },
        {
          props: {variant: 'Carbs'},
          style: {
            '& .MuiLinearProgress-bar' : {backgroundColor: '#9575cd'}
          },
        },
        {
          props: {variant: 'Fat'},
          style: {
            '& .MuiLinearProgress-bar' : {backgroundColor: '#ffc107'}
          },
        }
      ]
    },
    MuiOutlinedInput: {
      styleOverrides:{
        root:{
          backgroundColor: 'transparent',
          color: 'white',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9929EA',
          }
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <UserProvider>
          <Routes>
            <Route path = '/' element = {<Login />} />
            <Route path = {ROUTES.LOGIN} element = {<Login />} />
            <Route path = {ROUTES.REGISTER} element = {<Register />} />
            <Route path = {ROUTES.DASHBOARD} element = {<PrivateRouter><Dashboard /></PrivateRouter>} />
            <Route path = {ROUTES.PROFILE} element = {<PrivateRouter> <Profile /> </PrivateRouter>} />
            <Route path = {ROUTES.LOGOUT} element = {<Logout />} />
          </Routes>
        </UserProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
