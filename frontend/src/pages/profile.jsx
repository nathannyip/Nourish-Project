import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext'
import { editUser } from '../api/users';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, DialogTitle, Divider, MenuItem, Select, TextField, Snackbar } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {Dialog, DialogContent, DialogActions} from '@mui/material';
import Grid from '@mui/material/Grid';


export default function Profile({onViewChange}){
  const [open, setOpen] = useState(false);
  const { user, loading, refetchUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [heightFeet, setHeightFeet] = useState(user?.profile?.height_ft);
  const [heightInches, setHeightInches] = useState(
    user?.profile?.height_in !== undefined && user?.profile?.height_in !== null
      ? user.profile.height_in
      : 0
  );
  const [weight, setWeight] = useState(user?.profile?.weight);
  const [age, setAge] = useState(user?.profile?.age);
  const [gender, setGender] = useState(user?.profile?.gender);
  const [activityLevel, setActivityLevel] = useState(user?.profile?.activity_level);
  const [goal, setGoal] = useState(user?.profile?.goal);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClickOpen = () =>{
    setOpen(true);
  }

  const handleClose = () =>{
    setOpen(false);
  }

  useEffect(() => {
    if (user?.profile?.height_ft !== undefined) {
      setHeightFeet(user.profile.height_ft);
    }
    if (user?.profile?.height_in !== undefined && user?.profile?.height_in !== null) {
      setHeightInches(user.profile.height_in);
    } else {
      setHeightInches(0);
    }
    if (user?.profile?.weight !== undefined) {
      setWeight(user.profile.weight);
    }
    if (user?.profile?.age !== undefined){
      setAge(user.profile.age)
    }
    if (user?.profile?.gender !== undefined){
      setGender(user.profile.gender)
    }
    if (user?.profile?.activity_level !== undefined){
      setActivityLevel(user.profile.activity_level)
    }
    if (user?.profile?.goal !== undefined){
      setGoal(user.profile.goal)
    }
  }, [user]);

  // Handle Submit
  async function handleSubmit(event) {
    event.preventDefault();

    const profileData = {
      heightFeet: Number(heightFeet),
      heightInches: Number(heightInches),
      weight: Number(weight),
      age: Number(age),
      gender: gender,
      activityLevel: activityLevel,
      goal: goal,
    }
    try{
      await editUser(profileData);
      await refetchUser(); 
      setIsEditing(false);
      setSnackbarOpen(true);

    } catch (error) {
      console.error('Failed to update profile', error);
    }
  }

  // Load user
  if (loading || !user ){
    return <div>Loading profile...</div>;
  }

  // Generate options for feet
  const feetOptions = [3, 4, 5, 6, 7, 8];

  // Generate options for inches
  const inchesOptions = [0,1,2,3,4,5,6,7,8,9,10,11];

  // Generate age options
  const ageOptions = [];
  for (let i = 1; i < 101; i++){
    ageOptions.push(i);
  }

  // Gender options
  const genderOptions = [
    'Male',
    'Female',
  ]

  // Activity Level Options
  const activityLevelOptions =  [ 'Sedentary',  'Lightly Active', 'Moderately Active', 'Very Active']
  
  //Goal Options
  const goalOptions = [ 'Lose Weight', 'Gain Weight', 'Maintain Weight'];
  
  // Function to get BMI category
  const getBMICategory = (bmi) => {
    if (!bmi || bmi <= 0) return 'N/A';
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 25) return 'Normal Weight';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    if (bmi >= 30) return 'Obese';
    return 'N/A';
  };


  
  return (
   <Box sx={{display: 'flex', justifyContent: 'center', width: '100vw', minHeight: '100vh'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%', width: '50%', p: 4}}>
        <Box sx={{display:'flex', flexDirection: 'row', width: '100%'}}>
          <Avatar sx={{ mr: 3, width: {xs: 60, sm: 80, md: 100}, height: {xs: 60, sm: 80, md: 100} }}>{user.username[0].toUpperCase()}</Avatar>
          <Box sx={{textAlign: 'left'}}>
            <Typography fontWeight= {600} fontSize={30}>{user.username}</Typography>
            <Typography>{user.email}</Typography>
          </Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', mt: 4, gap: 3, flexWrap: {xs: 'wrap', md: 'nowrap'}}}>
          <Card sx={{width: {xs: '100%', md: '45%'}, mr: {xs: 0, md: 3}}}>
            <CardContent sx={{width: '100%', display:'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 2}}>
                 <PermIdentityIcon sx={{ mr: 1, fontSize: 28 }} />
                 <Typography variant='h5' fontWeight= '600'>Profile Information</Typography>
              </Box>
              <Box sx={{display: 'flex', flexDirection: 'row', width:'100%', justifyContent: 'flex-start', mb: 1  }}>
                <Box sx={{width:'50%',  mr: 1, textAlign: 'left'}}>
                  <Typography sx={{textAlign: 'left', fontSize: 15}} variant= 'caption'>Height</Typography>
                  <Typography sx={{textAlign: 'left', fontSize: 20}} fontWeight= {600}>{heightFeet}'{heightInches}</Typography>
                </Box>
                <Box sx={{textAlign: 'left'}}>
                  <Typography sx={{fontSize: 15, textAlign: 'left'}} variant= 'caption'>Weight</Typography>
                  <Typography sx={{textAlign: 'left', fontSize: 20}} fontWeight= {600}>{weight}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1, width: '90%' }} />
              <Box sx={{display: 'flex', flexDirection: 'row', width:'100%', justifyContent: 'flex-start', mb: 1}}>
                <Box sx={{width:'50%',  mr: 1, textAlign: 'left'}}>
                  <Typography sx={{textAlign: 'left', fontSize: 15}} variant= 'caption'>Age</Typography>
                  <Typography sx={{textAlign: 'left', fontSize: 20}} fontWeight= {600}>{age}</Typography>
                </Box>
                <Box sx={{textAlign: 'left'}}>
                  <Typography sx={{fontSize: 15, textAlign:'left'}} variant= 'caption'>Gender</Typography>
                  <Typography sx={{textAlign: 'left', fontSize: 20}}fontWeight= {600}>{gender}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1, width: '90%' }} />
              <Box sx={{display: 'flex', flexDirection: 'row', width:'100%', justifyContent: 'flex-start', mb: 1}}>
                <Box sx={{width:'50%',  mr: 1}}>
                  <Typography sx={{textAlign: 'left', fontSize: 15}} variant= 'caption'>Activity Level</Typography>
                  <Typography sx={{textAlign: 'left', fontSize: 20}} fontWeight= {600}>{activityLevel}</Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 1, width: '90%' }} />
              <Box sx={{display: 'flex', flexDirection: 'row', width:'100%', justifyContent: 'flex-start', mb: 1}}>
                <Box sx={{width:'50%',  mr: 1}}>
                  <Typography sx={{textAlign: 'left', fontSize: 15}} variant= 'caption'>Goal</Typography>
                  <Typography sx={{textAlign: 'left', fontSize: 20}} fontWeight= {600}>{goal}</Typography>
                </Box>
              </Box>
             </CardContent>
          </Card>
          <Card sx={{width: {xs: '100%', md: '45%'}, display: 'flex', minWidth: 0, flexShrink: 0}}>
            <CardContent sx={{display:'flex', flexDirection: 'column', alignItems: 'flex-start', height: '100%', width: '100%', p: 2}}>
              <Typography variant ='h5' fontWeight='600' sx={{fontSize: {xs: '1.1rem', sm: '1.25rem', md: '1.5rem'}}}>Calculated Values</Typography>
              <Box sx={{width: {xs: '85%',md: '90%'}, minWidth: '0%', mb: 3, mt: 2, bgcolor: 'background.light', borderRadius:2, p: {xs: 1, sm: 2}}}>
                <Typography variant= 'h6' sx={{fontSize: {xs: 12, sm: 14}}}>Body Mass Index</Typography>
                <Typography sx={{fontSize: {xs: 20, sm: 25, md: 30}, fontWeight: 600}}>{user.profile.bmi}</Typography>
                <Typography variant= 'caption' sx={{fontSize: {xs: 10, sm: 12}}}>{getBMICategory(user.profile.bmi)}</Typography>
              </Box>
              <Box sx={{width: {xs: '85%',md: '90%'}, bgcolor: 'background.light', borderRadius:2, p: {xs: 1, sm: 2}}}>
                <Typography variant= 'h6' sx={{fontSize: {xs: 12, sm: 14}}}>Calorie Goal</Typography>
                <Typography sx={{fontSize: {xs: 20, sm: 25, md: 30}, fontWeight: 600}}>{user.profile.calories}</Typography>
                <Typography variant= 'caption' sx={{fontSize: {xs: 10, sm: 12}}}>cal/day</Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{
         display: 'flex', 
         gap: 1, 
         width: {xs: '100%', sm: 'auto'},
         flexDirection: {xs: 'column', sm: 'row'},
         mt: 4
         }}>
  <Button variant='primary' onClick={handleClickOpen}>
    Edit Profile
  </Button>
  <Button variant='primary' onClick={() => onViewChange('home')}>
    Back to dashboard
  </Button>
</Box>
        <Dialog open= {open} onClose = {handleClose}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Box component= 'form' onSubmit ={handleSubmit}>
              <Grid container sx={{width:'100%'}} >
                <Grid size={{xs: 12}}><Typography variant= 'h6'>Basic Information</Typography></Grid>
                <Grid size= {{xs:6}}>
                  <Box sx={{mb: 1}}>
                    <Typography>Username</Typography>
                    <TextField sx={{width: '90%'}} value ={username} autoFocus onChange = {(event) => {setUsername(event.target.value)}} ></TextField>
                  </Box>
                </Grid>
                <Grid size= {{xs:6}}>
                  <Box>
                    <Typography>Email</Typography>
                    <TextField sx={{width: '100%'}} value = {email} onChange = {(event) => {setEmail(event.target.value)}} ></TextField>
                  </Box>
                </Grid>
                <Grid size={{xs: 12}}><Typography variant= 'h6'>Physical Information</Typography></Grid>
                <Grid size= {{xs:6}}>
                  <Box sx={{my: 1}}>
                    <Typography>Height</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb:1 }}>
                      <Select 
                        value={heightFeet !== undefined && heightFeet !== null ? heightFeet : ''} 
                        displayEmpty
                        onChange={(event) => {setHeightFeet(event.target.value)}}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <span style={{color: 'white'}}>Ft</span>;
                          }
                          return selected;
                        }}
                        sx={{ width: 120, bgcolor: 'background.light', color : 'text.primary', borderRadius: 1 }}
                      >
                        {feetOptions.map((foot) => (
                          <MenuItem  key={foot} value={foot}>{foot} ft</MenuItem>
                        ))}
                      </Select>
                      <Select 
                        value={heightInches !== undefined && heightInches !== null ? heightInches : ''} 
                        displayEmpty
                        onChange={(event) => {setHeightInches(event.target.value)}}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <span style={{color: 'white'}}>In</span>;
                          }
                          return selected;
                        }}
                        sx={{ width: 120, bgcolor: 'background.light', color : 'text.primary', borderRadius: 1 }}
                      >
                        {inchesOptions.map((inch) => (
                          <MenuItem key={inch} value={inch}>{inch} in</MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                </Grid>
                <Grid size= {{xs:6}}>
                  <Box>
                    <Typography>Weight (lbs)</Typography>
                    <TextField sx={{width: '100%'}} type= 'number' placeholder= {user.weight} value = {weight} onChange = {(event) => {setWeight(event.target.value)}}></TextField>
                  </Box>
                </Grid>
                <Grid size= {{xs:6}}>
                  <Box>
                    <Typography>Age</Typography>
                    <TextField sx={{width: '90%'}}type = 'number' placeholder= {user.age} value = {age} onChange = {(event) => {setAge(event.target.value)}}></TextField>
                  </Box>
                </Grid>
                <Grid size= {{xs:6}}>
                  <Box sx={{mb:2}}>
                    <Typography>Gender</Typography>
                    <Select 
                      value={gender || ''} 
                      displayEmpty
                      onChange={(event) => {setGender(event.target.value)}}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Select gender</span>;
                        }
                        return selected;
                      }}
                      sx={{ width: '100%', bgcolor: 'background.light'  }}
                    >
                      <MenuItem value={'Male'}>Male</MenuItem>
                      <MenuItem value={'Female'}>Female</MenuItem>
                      <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                  </Box>
                </Grid>

                <Grid size={{xs: 12, mt:1}}><Typography variant= 'h6'>Fitness Information</Typography></Grid>
                <Grid size= {{xs:6}}>
                                      <Box >
                      <Typography>Activity Level</Typography>
                      <Select 
                        value={activityLevel || ''} 
                        displayEmpty
                        onChange={(event) => {setActivityLevel(event.target.value)}}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Select activity level</span>;
                          }
                          return selected;
                        }}
                        sx={{ width: '90%', bgcolor: 'background.light' }}
                      >
                        {activityLevelOptions.map((activity)=> (
                          <MenuItem key={activity} value={activity}>{activity}</MenuItem>
                        ))}
                      </Select>
                    </Box>
                </Grid>
                <Grid size= {{xs:6}}>
                                      <Box>
                      <Typography>Fitness Goal</Typography>
                      <Select 
                        value={goal || ''} 
                        displayEmpty
                        onChange={(event) => {setGoal(event.target.value)}}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <span style={{color: 'rgba(0, 0, 0, 0.6)'}}>Select fitness goal</span>;
                          }
                          return selected;
                        }}
                        sx={{ width: '100%', bgcolor: 'background.light' }}
                      >
                        {goalOptions.map((goalOption)=> (
                          <MenuItem key={goalOption} value={goalOption}>{goalOption}</MenuItem>
                        ))}
                      </Select>
                    </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button variant = 'primary' onClick={handleClose}>Cancel</Button>
            <Button onClick = {handleSubmit}>Save Changes</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message="Profile updated successfully!"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
       {/* Not editing*/}

       {/* 
      {!isEditing && ( <div> 
        <h1>{user.username}</h1>
      <h5>{user.email}</h5>
      
      {/* Profile Information 
      <div>
        <h3>Profile Information</h3>
        <p>Height: {user.profile.height_ft}' {user.profile.height_in}"</p>
        <p>Weight: {user.profile.weight} lbs</p>
        <p>Age: {user.profile.age}</p>
        <p>Gender: {user.profile.gender}</p>
        <p>Activity Level: {user.profile.activity_level}</p>
        <p>Goal: {user.profile.goal}</p>
      </div>
      
      {/* Calculated Values 
      <div>
        <h3>Calculated Values</h3>
        {user.profile.bmi && <p>BMI: {user.profile.bmi}</p>}
        {user.profile.calories && <p>Maintenance Calories: {user.profile.calories} cal/day</p>}
      </div>
      </div>
      )}

      {/* Editing 
      {isEditing && ( <div> 
        <h1>{user.username}</h1>
      <h5>{user.email}</h5>
      
      {/* Profile Information 
      <form onSubmit = {handleSubmit}>
        <h3>Profile Information</h3>
       {/* Height Form 
        <p>Height:</p>
        <div>
        <select 
          value = {heightFeet}
          onChange = {(event) => {setHeightFeet(event.target.value)}}
          >
          {feetOptions.map(foot => (
            <option key = {foot} value = {foot}>{foot} ft</option>
          ))}
        </select>

        <select
          value = {heightInches}
          onChange = {event => {setHeightInches(event.target.value)}}
          >
            {inchesOptions.map(inch => (
              <option value = {inch} key = {inch}>{inch} in</option>
            ))}
          </select>
        </div>
        {/* Weight Form 
        <p>Weight:</p>
        <input 
          type='text' 
          placeholder={weight} 
          value={weight} 
          onChange={event => {setWeight(event.target.value)}}
          />
         {/* Age Form 
        <p>Age:</p>
        <select 
        value = {age}
        onChange = {(event) => {setAge(event.target.value)}}
        >
          {ageOptions.map(age => (
            <option value = {age} key = {age}>{age}</option>
          ))}
        </select>
         {/* Gender Form 
        <p>Gender:</p>
        <select value = {gender}
        onChange = {(event) => {setGender(event.target.value)}}
        >
         { genderOptions.map((gender) => (
           <option value = {gender} key = {gender}>{gender}</option>
          ))}
        </select>
         {/* Activity Form 
        <p>Activity Level:</p>
        <select value = {activityLevel}
        onChange = {(event) => {setActivityLevel(event.target.value)}}
        >
         { activityLevelOptions.map((activity) => (
        
            <option value = {activity} key = {activity}>{activity}</option>
          ))}
        </select>
         {/* Goal Form 
        <p>Goal:</p>
        <select value = {goal}
        onChange = {(event) => {setGoal(event.target.value)}}
        >
         { goalOptions.map((goal) => (
            <option value = {goal} key = {goal}>{goal}</option>
          ))}
        </select>
        <button type = 'submit'>Save</button>
      </form>
      <button onClick = {() => setIsEditing(false)}>Cancel</button>
      </div>
      )}


     
      <button onClick = {() => setIsEditing(true)}>Edit Profile</button>
      
      <Link to='/dashboard'>Back to dashboard</Link>
      */}
      </Box>
    </Box>
  )
}