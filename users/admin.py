from django.contrib import admin
from .models import Profile
from .models import Meal
from .models import MealType
from .models import MealLog
from .models import DailyProgress
# Register your models here.
admin.site.register(Profile)
admin.site.register(Meal)
admin.site.register(MealType)
admin.site.register(MealLog)
admin.site.register(DailyProgress)
