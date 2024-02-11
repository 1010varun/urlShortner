from django.contrib import admin
from django.urls import path
from shortner.views import *

urlpatterns = [
    path("shorturl", shortUrl.as_view(), name="base url"),
    path("login", login.as_view(), name="login"),
    path("signup", signup.as_view(), name="signup"), 
    path("forgotPassword", forgot_password.as_view(), name="forgotPassword"),
    path("allUrls", usersUrls.as_view(), name="userUrls"),
    path("mapUrl", mapUrl.as_view(), name="mapUrl"),
    path('admin/', admin.site.urls),
]
