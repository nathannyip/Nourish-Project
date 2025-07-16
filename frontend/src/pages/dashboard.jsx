import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Recommendations from './Recommendations';
import Profile from './profile';
import Box from '@mui/material/Box';
import SideMenu from '../components/SideMenu';
import { useState } from 'react';
import Home from './home';
import { createMeal, meal_list } from '../api/users';

export default function Dashboard(){
  const {user, loading, refetchUser} = useUser();
  const [activeView, setActiveView] = useState('home');
  const [refreshKey, setRefreshKey] = useState(0); 

  // Dialog state for viewing all meals
  const [mealsOpen, setMealsOpen] = useState(false);
  const [meals, setMeals] = useState([]);
  const [mealsLoading, setMealsLoading] = useState(false);

  const handleViewChange = (view) => {
    setActiveView(view);
  };


  useEffect(() => {
    if (!loading) {
      setRefreshKey(prev => prev + 1);
    }
  }, [loading]);
  
  if(loading) return <div>Loading...</div>
  if(!user) return <div>Please log in</div>
  
  return(
    <Box key={refreshKey} sx={{display: 'flex', background: 'linear-gradient(147deg,rgba(66, 66, 66, 1) 0%, rgba(54, 54, 54, 1) 13%, rgba(33, 33, 33, 1) 27%, rgba(0, 0, 0, 1) 69%)', minHeight: '100vh', width: '100vw'}}>
      <SideMenu onViewChange={handleViewChange} />
      {activeView === 'home' && <Home />}
      {activeView === 'meals' && <Recommendations onViewChange= {handleViewChange} />}
      {activeView === 'profile' && <Profile onViewChange= {handleViewChange} />}
    </Box>
  );
}