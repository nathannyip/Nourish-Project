import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import MealGridItem from './MealGridItem';
import { useState } from 'react';
import { IconButton, Snackbar } from '@mui/material';
import Button from '@mui/material/Button'
import { useUser } from '../context/UserContext';
import CollapseCardContent from './CollapseCardContent';

export default function MealCard({meal, handleViewChange}){
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const {addMeal, addMealLog} = useUser();

  const handleAddMeal = async () =>{
    const mealData = {
      'calories': meal.calories,
      'protein': meal.protein,
      'carbs': meal.carbs,
      'fat': meal.fat,
    }

    await addMeal(mealData);
    await addMealLog(meal.id);
    handleSnackBarClick();
  }

  const handleSnackBarClick = () => {
    setOpen(true);
  }

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleExpandClick = () =>{
    setExpanded(!expanded);
  }

  const onViewChange = () =>{
    handleViewChange('home')
  }

  return(
    <>
      <Card sx={{ minHeight: 450, width: '100%', display: 'flex', flexDirection: 'column', p: 3, borderRadius: '16px', '&:hover': { boxShadow: '0 4px 20px rgba(153,41,235,0.3)' }, minWidth: 320}}>
        {meal?.image && (
          <CardMedia
            component="img"
            height="250"
            image={meal.image}
            sx={{
              borderRadius: '16px',
              width: '100%',
              objectFit: 'cover',
              maxWidth: '350px',
              alignSelf: 'center'
            }}
          />
        )}
        <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <Typography variant= 'body1' sx={{ textAlign: 'left' , fontWeight: 'bold', color: 'text.primary' }}>{meal.title}</Typography>
          <Grid container spacing ={4} >
            <Grid size= {{xs: 12, md: 6}}>
              <MealGridItem macro= 'Protein' value= {meal.protein} />
            </Grid>
            <Grid size= {{xs: 12, md: 6}}>
              <MealGridItem macro= 'Carbs' value= {meal.carbs} />
            </Grid>
            <Grid size= {{xs: 12, md: 6}}>
              <MealGridItem macro= 'Fat' value= {meal.fat} />
            </Grid>
            <Grid size= {{xs: 12, md: 6}}>
              <MealGridItem macro= 'Calories' value= {meal.calories} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx= {{display: 'flex', width: '100%'}}>
          <Button variant = 'primary' onClick= {handleAddMeal}  sx={{  width: '75%'}}>Add meal</Button>
          <IconButton
            sx={{
              width: '15%',
              color: 'text.primary',
              transition: (theme) => theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
              }),
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
            onClick={handleExpandClick}
            aria-label="Show more"
            aria-expanded={expanded}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in= {expanded} timeout= 'auto' unmountOnExit>
          <CollapseCardContent meal= {meal}/>
        </Collapse>
      </Card>
      <Snackbar 
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        message='Meal added!'
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        action={
          <Button onClick= {onViewChange} >View</Button>
        }
      />
    </>
  )
}