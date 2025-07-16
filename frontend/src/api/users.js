export async function loginUser(credentials){
  try {
    // Send a post request to the backend with the users' credentials
    const response = await fetch('/users/api/login/', { // State the request's attributes
      method : 'POST', 
      headers : {'Content-Type' : 'application/json'},
      body: JSON.stringify(credentials)
    });
    
    // Try to parse JSON response
    let data;
    try {
      data = await response.json();
    } catch (error) {
      // If response is not JSON, create a generic error
      throw new Error(`Server error: ${response.status}`);
    }
    
    console.log(data);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || 'Network error occurred'
    };
  }
}

export async function registerUser(credentials){
  // Send a post to the backend with the user's credentials.
  const response = await fetch('/users/api/register/', {
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify(credentials)
  });
  console.log(JSON.stringify(credentials));
  const data = await response.json();
  console.log(data);

  return data;

}

export async function logoutUser(){
  const response = await fetch('/users/api/logout/', {
    method : 'POST',
    credentials : 'include'
  });

  if(response.ok){
    return true;
    
  }
  return false;
}

export async function editUser(profileData) {
  try{
    const response = await fetch('users/api/edit-user/', {
      method : 'PATCH',
      headers : {
        'Content-Type': 'application/json',
      },
      credentials : "include",
      body: JSON.stringify({
        height_ft: profileData.heightFeet,
        height_in: profileData.heightInches,
        weight: profileData.weight,
        age: profileData.age,
        gender : profileData.gender.toLowerCase(),
        activity_level: profileData.activityLevel.toLowerCase().replace(' ', '_'),
        goal: profileData.goal.toLowerCase().replace(' ', '_')
      })

    });
    if(!response.ok){
      throw new Error('Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile :' ,error);
    throw error;
  }
}

export async function fetchTodayProgress() {
  const response = await fetch('/api/progress/today/', {
    credentials : 'include',
  });
  if (response.ok){
    const data = await response.json();
    return data;
  }
  else{
    console.log("Error fetching today's progress");
    return null;
  }
}

export async function updateTodayProgress(updates) {
  const response = await fetch('/api/progress/today/', {
    method : 'PATCH',
    headers: {
      'Content-type' : 'application/json',
    },
    credentials : 'include',
    body: JSON.stringify(updates),
  });

  if (response.ok){
    const data = await response.json();
    return data;
  }
  else{
    console.log("Error updating today's progress")
    return null;
  }
}

export async function importMealList(){
  const response = await fetch('/users/api/meal-list/', {credentials: 'include'}); // Include cookies for authentication
  if (response.ok){
    const data = await response.json();
    return data;
  }
  else{
    console.log("Error retrieving meal list");
    return null;
  }
}

export async function meal_list() {
  const res = await fetch('/api/meals/', {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch meals');
  }
  return await res.json();
}

export async function fetchMealLogs() {
  const res = await fetch('/api/meal-log', {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch meal logs');
  }
  return await res.json();
}

export async function create_meal(meal_data){
  const response = await fetch('/users/api/create-meal/', {
    method : 'POST',
    body: meal_data,
  });
  console.log(meal_data);
  const data = await response.json();
  console.log(data);

  return data;

}