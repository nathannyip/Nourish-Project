import React, {useEffect, useState}  from 'react';
import Box from '@mui/material/Box';
import MealCard from './MealCard';
import Grid from '@mui/material/Grid';
import { importMealList } from '../api/users';


export default function MealGrid({mealType, handleViewChange}) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    if(!mealType) return;
    setLoading(true);
    importMealList()
    .then(data => setMeals(data))
    .finally(() => setLoading(false));
  }, [mealType]);
  if(loading) return <div>Loading...</div>;
  const filteredMeals = meals.filter(meal => meal.mealType.includes(mealType)); // Filter meals where meal types include user's chosen meal type

  return(
    <Box>
      <Grid container spacing= {10} sx={{minWidth: '100%'}}  >
        {filteredMeals.map((recommendation, idx) => (
          <Grid key={idx} size={{xs:12, sm: 6, md: 4}}>
            <MealCard handleViewChange = {handleViewChange} meal = {recommendation} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )}
