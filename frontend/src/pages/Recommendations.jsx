import React , {useState} from 'react'
import { useUser } from '../context/UserContext'
import MealGrid from '../components/MealGrid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';

import { create_meal } from '../api/users';


export default function Recommendations({onViewChange}){
  const {mealSplits} = useUser();
  const [selectedMeal, setSelectedMeal] = useState('Breakfast');

  // Dialog state
  const [open, setOpen] = useState(false);
  const [mealForm, setMealForm] = useState({
    title: '',
    image: null,
    instructions: '',
    ingredients: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: '',
    mealType: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMealForm({
      title: '',
      image: null,
      instructions: '',
      ingredients: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
      mealType: [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setMealForm((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleMealTypeChange = (e) => {
    const { value } = e.target;
    setMealForm((prev) => ({
      ...prev,
      mealType: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Create FormData and append all fields
    const formData = new FormData();
    formData.append('title', mealForm.title);
    formData.append('instructions', mealForm.instructions);
    formData.append('ingredients', mealForm.ingredients);
    formData.append('calories', mealForm.calories);
    formData.append('protein', mealForm.protein);
    formData.append('carbs', mealForm.carbs);
    formData.append('fat', mealForm.fat);
    formData.append('fiber', mealForm.fiber);
    // For mealType, you can either send as JSON string or append each value
    mealForm.mealType.forEach(type => formData.append('mealType', type));
    if (mealForm.image) {
      formData.append('image', mealForm.image);
    }

    try {
      await create_meal(formData); // Pass FormData to your API function
      handleClose();
      window.location.reload(); // Refresh the page after closing the dialog
    } catch (error) {
      console.error('Failed to create meal', error);
    } finally {
      setSubmitting(false);
    }
  };


  return(
    <Box sx= {{minHeight: '100vh', height: '100%', width: '100%', position: 'relative'}}>
      {/* Top right plus button */}
      <Box sx={{ position: 'absolute', top: 16, right: 32, zIndex: 10 }}>
        <IconButton color="primary" onClick={handleOpen} size="large">
          <AddIcon />
        </IconButton>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Meal</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, minWidth: 350 }}>
            <TextField
              margin="dense"
              label="Title"
              name="title"
              value={mealForm.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              margin="dense"
              label="Instructions"
              name="instructions"
              value={mealForm.instructions}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              margin="dense"
              label="Ingredients"
              name="ingredients"
              value={mealForm.ingredients}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={2}
            />
            <TextField
              margin="dense"
              label="Calories"
              name="calories"
              value={mealForm.calories}
              onChange={handleChange}
              type="number"
              fullWidth
            />
            <TextField
              margin="dense"
              label="Protein"
              name="protein"
              value={mealForm.protein}
              onChange={handleChange}
              type="number"
              fullWidth
            />
            <TextField
              margin="dense"
              label="Carbs"
              name="carbs"
              value={mealForm.carbs}
              onChange={handleChange}
              type="number"
              fullWidth
            />
            <TextField
              margin="dense"
              label="Fat"
              name="fat"
              value={mealForm.fat}
              onChange={handleChange}
              type="number"
              fullWidth
            />
            <InputLabel sx={{ mt: 2 }}>Meal Type</InputLabel>
            <Select
              name="mealType"
              multiple
              value={mealForm.mealType}
              onChange={handleMealTypeChange}
              fullWidth
              renderValue={(selected) => selected.join(', ')}
            >
              {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
            <InputLabel sx={{ mt: 2 }}>Image</InputLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginTop: 8, marginBottom: 8 }}
            />
            <DialogActions>
              <Button onClick={handleClose} disabled={submitting}>Cancel</Button>
              <Button type="submit" disabled={submitting} variant="contained">Create</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
      <Box display= 'flex' flexDirection= 'column' alignItems= 'flex-start' m= {5} sx={{width: '90%'}}>
        <Typography variant= 'h4' sx={{fontWeight: 600, mb: 1}}>Meal Library</Typography>
        <Typography variant= 'h6' sx={{fontSize: 14, mb: 2}}>Discover and plan your perfect meals</Typography>
        <Stack justifyContent= 'flex-start' direction= 'row' gap= {2}>
          <Button variant = {selectedMeal === 'Breakfast' ? 'primary' : 'tertiary'}
                  onClick= {() => {setSelectedMeal('Breakfast')}}>
              Breakfast ~{mealSplits.breakfast} cal
          </Button>
          <Button variant = {selectedMeal === 'Lunch' ? 'primary' : 'tertiary'}
                  onClick= {() => {setSelectedMeal('Lunch')}}>
              Lunch ~{mealSplits.lunch} cal
          </Button>
          <Button variant = {selectedMeal === 'Dinner' ? 'primary' : 'tertiary'}
                  onClick= {() => {setSelectedMeal('Dinner')}}>
              Dinner ~{mealSplits.dinner} cal
          </Button>
          <Button variant = {selectedMeal === 'Snack' ? 'primary' : 'tertiary'}
                  onClick= {() => {setSelectedMeal('Snack')}}>
              Snack ~{mealSplits.snack} cal
          </Button>
        </Stack>
        <Typography variant='h5' sx= {{mt: 2, fontWeight: 'bold'}}>Recommended Meals for {selectedMeal}</Typography>
        <Typography variant='h6' sx={{fontSize: 16, my: 1}}>Enjoy these nutritious options</Typography>
        <MealGrid handleViewChange = {onViewChange} mealType = {selectedMeal} calories = {mealSplits[selectedMeal]} />
      </Box>
    </Box>
  )
}