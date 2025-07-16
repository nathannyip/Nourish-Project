from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Profile(models.Model):
  user = models.OneToOneField(User, on_delete = models.CASCADE, related_name= "profile")
  height_ft = models.IntegerField(default = 0) 
  height_in = models.IntegerField(default = 0)
  weight = models.IntegerField(default = 0)
  age = models.IntegerField(default = 0)
  gender = models.CharField(max_length = 20, choices = [('male', 'Male'), ('female', 'Female')], default='male')
  activity_level = models.CharField( choices = [('sedentary', 'Sedentary'), ('lightly_active', 'Lightly Active'), ('moderately_active', 'Moderately Active'), ('very_active', 'Very Active')], default='sedentary')
  goal = models.CharField(max_length = 20, choices = [('lose_weight', 'Lose Weight'), ('gain_weight', 'Gain Weight'), ('maintain_weight', 'Maintain Weight')], default='maintain_weight')
  calories = models.IntegerField(default = 0) 
  protein = models.IntegerField(default = 0) # In grams
  carbs = models.IntegerField(default = 0) # In grams
  fat = models.IntegerField(default = 0) # In grams

  

  def __str__(self):
    return f"{self.user.username}'s Profile"
  
  def calculate_bmi(self):
    '''Calculate BMI (pounds, in)'''
    height_inches = (self.height_ft * 12) + self.height_in
    if height_inches == 0 or self.weight == 0:
      return None
    bmi = (self.weight / (height_inches ** 2)) * 703
    return round(bmi,1)
  
  def calculate_maintenance_calories(self):
    """Calculate maintenance calories using the Mifflin-St Jeor Equation"""
    # Convert height to cm and weight to kg
    height_inches = (self.height_ft * 12) + self.height_in
    height_cm = height_inches * 2.54
    weight_kg = self.weight * 0.453592
    if height_cm == 0 or weight_kg == 0 or self.age == 0:
      return None
    
    #Calculate BMR
    if self.gender == 'male':
      bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * self.age) + 5
    else: 
      bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * self.age) - 161

    # Activity multipliers
    activity_multipliers = {
      'sedentary' : 1.2,
      'lightly_active' : 1.375,
      'moderately_active': 1.55,
      'very_active': 1.725, 

    }

    multiplier = activity_multipliers.get(self.activity_level, 1.2)
    maintenance_calories = bmr * multiplier
    return round(maintenance_calories)
  
class DailyProgress(models.Model):
  profile = models.ForeignKey(Profile, on_delete= models.CASCADE, related_name = "daily_progress")
  date = models.DateField(default = timezone.now)
  calories = models.IntegerField(default =0)
  protein = models.IntegerField(default =0)
  carbs = models.IntegerField(default =0)
  fat = models.IntegerField(default =0)

  class Meta:
    unique_together = ('profile', 'date') # Only one unique combination of profile and date

class MealType(models.Model):
  name = models.CharField(max_length= 128)

  def __str__(self):
    return self.name

class Meal(models.Model):
  creator = models.ForeignKey(Profile, on_delete= models.CASCADE, related_name= 'meals', null=True, blank=True) # Create a many to one relationship with profile
  title = models.CharField(max_length=128)
  image = models.FileField(upload_to='images/')
  instructions = models.TextField()
  ingredients = models.TextField()
  calories = models.IntegerField(default =0)
  protein = models.IntegerField(default =0)
  carbs = models.IntegerField(default =0)
  fat = models.IntegerField(default =0)
  fiber = models.IntegerField(default =0)
  mealType = models.ManyToManyField(MealType, related_name= 'meals')

  def __str__(self):
    return self.title
  
class MealLog(models.Model):
  profile = models.ForeignKey(Profile, on_delete= models.CASCADE, related_name= 'meal_log')
  meal = models.ForeignKey(Meal, on_delete= models.CASCADE)
  date_logged = models.DateTimeField(default=timezone.now)





  
  



