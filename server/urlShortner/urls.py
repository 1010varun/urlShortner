"""urlShortner URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
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
