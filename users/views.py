from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from .models import Profile, DailyProgress, Meal, MealLog
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils import timezone
from django.db.models import Q
from datetime import timedelta



# Create your views here.

@csrf_exempt
def login_view(request):
  # If user is authenticated, redirect to index page
  if request.method == 'POST':
    data = json.loads(request.body) 
    username = data['username']
    password = data['password']
    user = authenticate(request, username = username, password = password)
    if user is not None:
      login(request, user)
      return JsonResponse({
        'success' : True,
        'message' : 'Logged in'
      })
    # If user is not authenticated, render login page with error message
    else: 
      # If user is not authenticated, render login page with register option
      return JsonResponse({
        'success' : False,
        'message' : 'Invalid credentials'
      })
  # If user is not authenticated, render login page
  return JsonResponse({
        'message' : 'Method not allowed'
      })

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'success': True, 'message': 'Logged out'})
    return JsonResponse({'detail': 'Method not allowed'}, status=405)


@csrf_exempt
def register_view(request):
  if request.method == "POST":
     data = json.loads(request.body) 
     username = data['username']
     password = data['password']
     first_name = data['first_name']
     last_name = data['last_name']
     confirm_password = data['confirm_password']
     email = data['email']

      # Basic registration requirements
     if password != confirm_password:
      return JsonResponse({'success': False, 'message': 'Passwords do not match'}, status=400)
     
     if User.objects.filter(username = username).exists():
      return JsonResponse({'success': False, 'message': 'Username already exists'}, status=400)
     
     if User.objects.filter(email = email).exists():
      return JsonResponse({'success': False, 'message': 'Email already exists'}, status=400)
     
     # Create custom user and profile
     user = User.objects.create_user(username = username, password = password, email = email, first_name = first_name, last_name = last_name)
     Profile.objects.create(user = user)

     # Login new user
     login(request, user)
     return JsonResponse({
       'success' : True,
       'message' : 'Registered and logged in',
     })
  
  return JsonResponse({
    'message' : 'Method not allowed'
  }, status = 405)
  
@csrf_exempt
@login_required
def current_user(request):
    user = request.user
    profile = user.profile  # Get the related profile
    
    # Create a dictionary with user and profile data
    user_data = {
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'date_joined': user.date_joined,
        'profile': {
            'height_ft': profile.height_ft,
            'height_in': profile.height_in,
            'weight': profile.weight,
            'age': profile.age,
            'gender': profile.get_gender_display(),
            'activity_level': profile.get_activity_level_display(),
            'goal': profile.get_goal_display(),
            'calories': profile.calories,
            'protein': profile.protein,
            'carbs': profile.carbs,
            'fat': profile.fat,
            'bmi': profile.calculate_bmi(),
            'calories': profile.calculate_maintenance_calories(),
        }
    }
    
    return JsonResponse(user_data)

@csrf_exempt
@login_required
def edit_user(request):
  try:
    profile = request.user.profile
    data = json.loads(request.body)
    # Update fields
    for field, value in data.items():
      if hasattr(profile, field):
        setattr(profile, field, value)

    profile.save()

    profile.bmi = profile.calculate_bmi()
    profile.calories = profile.calculate_maintenance_calories()

    return JsonResponse({
      'message' : 'Profile updated successfully',
      'profile' : {
        'height_ft': profile.height_ft,
                'height_in': profile.height_in,
                'weight': profile.weight,
                'age': profile.age,
                'gender': profile.gender,
                'activity_level': profile.activity_level,
                'goal': profile.goal,
                'bmi': profile.bmi,
                'calories': profile.calories,
      }
    })
  
  except Exception as e:
    return JsonResponse({'error' : str(e)}, status=500)
  
@csrf_exempt
@login_required
def TodayProgressView(request):
  profile = request.user.profile
  today = timezone.now().date()
  progress, created = DailyProgress.objects.get_or_create(profile=profile, date = today)

  if request.method == 'GET':
    # Return today's progress
    data = {
      'date' : str(progress.date),
      'calories' : progress.calories,
      'protein' : progress.protein,
      'carbs' : progress.carbs,
      'fat' : progress.fat,
    }
    return JsonResponse(data)
  
  elif request.method == 'PATCH':
    try:
      body = json.loads(request.body)
      # Update the fields provided by frontend
      for field in ['calories', 'protein', 'carbs', 'fat']:
        if field in body:
          setattr(progress, field, getattr(progress, field) + body[field])
      progress.save()
      data = {
        'date' : str(progress.date),
        'calories' : progress.calories,
        'protein' : progress.protein,
        'carbs' : progress.carbs,
        'fat' : progress.fat
      }
      return JsonResponse(data)
    except Exception as e:
      return JsonResponse({'error' : str(e) }, error =400)
    
  else:
      return JsonResponse({'error' : str(e)}, status= 400)
  

@csrf_exempt
@login_required
def meal_list(request):
  profile = request.user.profile
  if (request.method == 'GET'):
    meals = Meal.objects.filter(Q(creator=profile) | Q(creator__isnull=True))
    meal_list = []
    for meal in meals:
      meal_list.append({
        'id': meal.id,
        'title' : meal.title,
        'image' : meal.image.url,
        'instructions' : meal.instructions,
        'ingredients' : meal.ingredients,
        'calories' : meal.calories,
        'protein' : meal.protein,
        'carbs' : meal.carbs,
        'fat' : meal.fat,
        'fiber' : meal.fiber,
        'mealType' : [mt.name for mt in meal.mealType.all()]
      })
    return JsonResponse(meal_list, safe=False)
  
@csrf_exempt
@login_required
def meal_log(request):
  profile = request.user.profile
  if request.method == 'GET':
    meal_logs = []
    logs = MealLog.objects.filter(profile = profile)
    for log in logs:
      meal_logs.append({
        'id': log.meal.id,
        'title': log.meal.title,
        'calories': log.meal.calories,
        'date': log.date_logged,
      })
    return JsonResponse(meal_logs, safe=False)
  elif request.method == 'POST':
    try:
      data = json.loads(request.body)
      meal_id = data['meal_id']
      meal = Meal.objects.get(id = meal_id)
      log = MealLog.objects.create(profile = profile, meal= meal)
      return JsonResponse({
        'success': True,
        'log_id' : log.id,
        'meal' : log.meal.id,
        'date': log.date_logged
      }, status = 201)
    except Meal.DoesNotExist:
      return JsonResponse({'success' : False, 'error': 'Meal does not exist'})
    except Exception:
      return JsonResponse({'success' : False, 'error': str(Exception)})


@csrf_exempt
@login_required
def weekly_progress(request):
  profile = request.user.profile
  if request.method == 'GET':

    # Get last 7 days of data
    today = timezone.now().date()
    six_days_ago = today - timedelta(days=6)
    weekly_data = []

    # Loop through each day, see if day exists, then add to weekly_data.
    check_date = six_days_ago
    while check_date <= today:
      try:
        day = DailyProgress.objects.get(profile=profile, date=check_date)
        weekly_data.append({
          'day': day.date.strftime('%a'),
          'date': day.date.strftime('%x'),
          'calories': day.calories,
          'protein': day.protein,
          'carbs': day.carbs,
          'fat': day.fat,
        })
        check_date = check_date + timedelta(days=1)
      except DailyProgress.DoesNotExist:
        weekly_data.append({
          'day': check_date.strftime('%a'),
          'date': check_date.strftime('%x'),
          'calories': 0,
          'protein': 0,
          'carbs': 0,
          'fat': 0,
        })
        check_date = check_date + timedelta(days=1)

    return JsonResponse(weekly_data, safe=False)
  
  return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
@login_required
def create_meal(request):
    if request.method == 'POST':
        profile = request.user.profile
        try:
            def safe_int(val, default=0):
                try:
                    return int(val)
                except (ValueError, TypeError):
                    return default
            if request.content_type.startswith('multipart/form-data'):
                # Handle multipart (with image)
                title = request.POST['title']
                instructions = request.POST['instructions']
                ingredients = request.POST['ingredients']
                calories = safe_int(request.POST.get('calories', 0))
                protein = safe_int(request.POST.get('protein', 0))
                carbs = safe_int(request.POST.get('carbs', 0))
                fat = safe_int(request.POST.get('fat', 0))
                fiber = safe_int(request.POST.get('fiber', 0))
                meal_type_names = request.POST.getlist('mealType')
                image = request.FILES['image'] if 'image' in request.FILES else None
            else:
                # Handle JSON
                data = json.loads(request.body)
                title = data['title']
                instructions = data['instructions']
                ingredients = data['ingredients']
                calories = safe_int(data.get('calories', 0))
                protein = safe_int(data.get('protein', 0))
                carbs = safe_int(data.get('carbs', 0))
                fat = safe_int(data.get('fat', 0))
                fiber = safe_int(data.get('fiber', 0))
                meal_type_names = data['mealType']
                image = None

            meal = Meal.objects.create(
                creator=profile,
                title=title,
                instructions=instructions,
                ingredients=ingredients,
                calories=calories,
                protein=protein,
                carbs=carbs,
                fat=fat,
                fiber=fiber,
                image=image,
            )
            from .models import MealType
            meal_types = MealType.objects.filter(name__in=meal_type_names)
            meal.mealType.set(meal_types)
            return JsonResponse({
                'success': True,
                'meal': {
                    'id': meal.id,
                    'title': meal.title,
                    'image': meal.image.url if meal.image else None,
                    'instructions': meal.instructions,
                    'ingredients': meal.ingredients,
                    'calories': meal.calories,
                    'protein': meal.protein,
                    'carbs': meal.carbs,
                    'fat': meal.fat,
                    'mealType': [mt.name for mt in meal.mealType.all()],
                }
            }, status=201)
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)
















