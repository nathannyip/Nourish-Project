import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useUser } from '../context/UserContext';
import Button from '@mui/material/Button';
import LogCard
 from './LogCard';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { meal_list } from '../api/users';
export default function RecentMeals(){
  const {mealLogs} = useUser();
  const logs = Array.isArray(mealLogs) ? mealLogs : [];
  const [mealsOpen, setMealsOpen] = React.useState(false);

  const handleOpenMeals = async () => {
    setMealsOpen(true);
  };
  const handleCloseMeals = () => setMealsOpen(false);

  return(
    <Card sx={{height: 460}}>
      <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <Typography sx= {{fontWeight: 600}}>Recent Meals</Typography>
        <Typography variant= 'caption'>Your latest food intake</Typography>
        <List sx={{width: '100%'}}>
          {logs.slice(-3).reverse().map((log, index) =>(
            <ListItem key= {index}>
              <LogCard meal = {log}/>
            </ListItem>
          ))}
         
        </List>
        <Button variant="primary" sx={{mt: 2, width: '100%', }} onClick={handleOpenMeals}>
          View All Recent Meals
        </Button>
        <Dialog open={mealsOpen} onClose={handleCloseMeals} fullWidth maxWidth="sm">
          <DialogTitle>All Recent Meals</DialogTitle>
          <DialogContent dividers>
          <List sx={{width: '100%'}}>
          {logs.map((log, index) =>(
            <ListItem key= {index}>
              <LogCard meal = {log}/>
            </ListItem>
          ))}
        </List>
          </DialogContent>
          <DialogActions>
            <Button variant='primary' onClick={handleCloseMeals}>Close</Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  )
}