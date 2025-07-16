import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CalorieCard from './CalorieCard';
import MacroCard from './MacroCard';
import { useUser} from '../context/UserContext';
import WeeklyProgress from './WeeklyProgress';
import RecentMeals from './RecentMeals';

export default function MainGrid(){
  const {daily_nutrition, loading, proteinGoal, fatGoal, carbGoal } = useUser();

  if (loading || !daily_nutrition) return <Typography>Loading...</Typography>
  const macros = [
    {'title' : 'PROTEIN', 'value' : daily_nutrition.protein, 'goal' : proteinGoal},
    {'title' : 'CARBS', 'value' : daily_nutrition.carbs, 'goal' : carbGoal },
    {'title' : 'FAT', 'value' : daily_nutrition.fat, 'goal' : fatGoal},
  ]
  return (
    <Grid container spacing= {4} columns= {12} sx={{width: '100%'}}>
      <Grid size={{xs: 12, sm: 6, md:3 }}>
        <CalorieCard />
      </Grid>
      {macros.map(item => (
      <Grid key= {item.title} size={{xs: 12, sm: 6, md: 3}}>
        <MacroCard macroItem= {item}/>
      </Grid>
      ))}
      <Grid size={{xs: 12, md: 8}}>
        <WeeklyProgress />
      </Grid>
      <Grid size={{xs: 12, md: 4}}>
        <RecentMeals />
      </Grid>
    </Grid>
  )
}