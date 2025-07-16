import React, { createContext, useState, useContext, useEffect } from 'react'

const UserContext = createContext();

export default function UserProvider({ children }){
  const [state, setState] = useState({
    user : null,
    loading : true,
    daily_nutrition : {
      calories : 0,
      protein : 0,
      carbs: 0,
      fat: 0,
      date: new Date().toDateString(),
    },
    mealLogs: [],
    weeklyProgress: [],
  })
  
  const maintenanceCalories = state.user?.profile?.calories || 2000;
  const mealSplits = {
    breakfast: Math.round(maintenanceCalories * 0.25),
    lunch: Math.round(maintenanceCalories * 0.3),
    dinner: Math.round(maintenanceCalories * 0.3),
    snack: Math.round(maintenanceCalories * 0.15),
  };

  // Macro ratios
  const proteinRatio = 0.30;
  const carbRatio = 0.50;
  const fatRatio = 0.20;

  // Macro goals in grams
  const proteinGoal = Math.round((maintenanceCalories * proteinRatio) / 4);
  const carbGoal = Math.round((maintenanceCalories * carbRatio) / 4);
  const fatGoal = Math.round((maintenanceCalories * fatRatio) / 9);
  
  // Fetch meal logs from backend
  const fetchMealLogs = async () =>{
    const response = await fetch('/users/api/meal-log', { credentials : 'include'})
    if (response.ok){
      const data = await response.json();
      setState((prev) => ({...prev, mealLogs: data}))
    }
  }

  // Fetch weekly progress
  const fetchWeeklyProgress = async () =>{
    const response = await fetch('/users/api/weekly-progress/', {credentials : 'include'})
    if (response.ok){
      const data = await response.json();
      setState((prev) => ({...prev, weeklyProgress: data}));
    }
  }
  // Add a new meal log
  const addMealLog = async (mealId) =>{
    const response = await fetch('/users/api/meal-log', {
      method : 'POST',
      headers: {'Content-Type' : 'application/json'},
      credentials: 'include',
      body: JSON.stringify({meal_id: mealId}),
    });
    if (response.ok){
      console.log(state.mealLogs);
      console.log('Meal log added!')
      fetchMealLogs();

    }
  };

  // Fetch user info from API, including cookies and HTTP authentication info
  const fetchUser = async () => {
    try {
      const response = await fetch("/users/api/me/", { credentials: "include" });
      if (!response.ok) throw new Error("Not authenticated");
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        user: data,
        loading: false,
      }));
    } catch {
      setState((prevState) => ({
        ...prevState,
        user: null,
        loading: false,
      }));
    }
  };

  // Expose a refetchUser function for consumers
  const refetchUser = async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    await fetchUser();
  };

  // useEffect is used to run anything that affects something outside the scope of the function being executed.
  useEffect(() => {
    fetchUser();
    // Fetch today's nutrition from backend
    fetch('/users/api/progress/today/' ,{ credentials : 'include'})
    .then((response) => response.json())
    .then((data) => setState((prevState) => ({
      ...prevState,
      daily_nutrition: {
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
        date: data.date,
      },
    })))

    fetchMealLogs();
    fetchWeeklyProgress();
    console.log(state.weeklyProgress);
  }, [state.loading]);

  const addMeal = async (mealData) => {
    // Patch the meal data to the backend
    const response = await fetch('/users/api/progress/today/',{
      method: 'PATCH',
      headers : {'Content-Type' : 'application/json'},
      credentials : 'include',
      body: JSON.stringify(mealData),
    } );

    if (response.ok){
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        daily_nutrition : {
          calories : data.calories,
          protein: data.protein,
          carbs : data.carbs,
          fat : data.fat,
          date: data.date,
        }
      }));
    }
    fetchWeeklyProgress();
  }

  return (
    <UserContext.Provider value= {{
      ...state,
      setState,
      addMeal,
      addMealLog,
      mealSplits,
      proteinGoal,
      carbGoal,
      fatGoal,
      refetchUser,
    }}>
    {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}

