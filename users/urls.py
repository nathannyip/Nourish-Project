from django.urls import path
from . import views
from .views import create_meal

urlpatterns = [
    path('api/login/', views.login_view, name='api_login'),
    path('api/register/', views.register_view, name='api_register'),
    path('api/logout/', views.logout_view, name='api_logout'),
    path('api/me/', views.current_user, name = 'api_current_user'),
    path('api/edit-user/', views.edit_user, name = 'api_edit_user'),
    path('api/progress/today/', views.TodayProgressView, name = 'api_today_progress'),
    path('api/meal-list/', views.meal_list, name='api_meal-list'),
    path('api/meal-log', views.meal_log, name='api_meal_log'),
    path('api/weekly-progress/', views.weekly_progress, name='api_weekly_progress'),
    path('api/create-meal/', create_meal, name='create_meal'),
] 