import React from 'react';
import { useUser } from '../context/UserContext'

export default function TodayProgress() {
  const { user, daily_nutrition, loading} = useUser();
  
  // Safety check - if daily_nutrition is undefined, show loading or default values
  if (loading) {
    return (
      <div className="today-progress">
        <h2>Today's Progress</h2>
        <div>Loading nutrition data...</div>
      </div>
    );
  }

  return (
    <div className="today-progress">
      <h2>Today's Progress</h2>
      <div className="progress-container">
        <div className="nutrition-summary">
          <h3>Calories: {daily_nutrition.calories} / {user?.profile?.calories || 2000}</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{
                width: `${Math.min((daily_nutrition.calories / (user?.profile?.calories || 2000)) * 100, 100)}%`,
                backgroundColor: daily_nutrition.calories > (user?.profile?.calories || 2000) ? '#ff6b6b' : '#4CAF50'
              }}
            ></div>
          </div>
          
          <div className="macros">
            <p>Protein: {daily_nutrition.protein}g</p>
            <p>Carbs: {daily_nutrition.carbs}g</p>
            <p>Fat: {daily_nutrition.fat}g</p>
          </div>
        </div>

      </div>
    </div>
  );
} 