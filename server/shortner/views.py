import pyshorteners
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import *
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
import json


# @method_decorator(csrf_exempt, name='dispatch')

# @csrf_exempt


# CLASS FOR USER SIGNUP
class signup(APIView):

    def post(self, request):
        data = request.data
        userName = data["userName"]
        password = data["password"]

        user_data = user.objects.filter(userName = userName)

        if(len(user_data)):
            resp = "USER ALREADY EXISTS"
            status = 403
        else:
            new_user = user(userName = userName, password = password)
            new_user.save()
            resp = "USER CREATED"
            status = 200
        
        return HttpResponse(resp, status=status)



# CLASS FOR USER LOGIN
class login(APIView):

    def post(self, request):
        data = request.data
        userName = data["userName"]
        password = data["password"]
        user_data = user.objects.filter(userName = userName)
        if(len(user_data)):
            user_password = user.objects.get(userName = userName).password
            if(password == user_password):
                resp = "SUCCESS"
                status = 200
            else:
                resp = "INNCORRECT PASSWORD"
                status = 401
        else:
            resp = "USER NOT FOUND"
            status = 400

        return HttpResponse(resp, status = status)
    

# CLASS FOR FORGOT PASSWORD
class forgot_password(APIView):

    def post(self, request):
        data = request.data
        userName = data["userName"]
        new_password = data["password"]
        user_data = user.objects.filter(userName = userName)
        if(len(user_data)):
            user_data.update(password=new_password)
            resp = "SUCCESSFULLY UPDATED PASSWORD"
            status = 200
        else:
            resp = "NO SUCH USERNAME FOUND"
            status = 400

        return HttpResponse(resp, status = status)



# CLASS FOR MAKING URL SHORT
class shortUrl(APIView) :

    def short(self, longUrl):
        shortener = pyshorteners.Shortener()
        reduced_url = shortener.tinyurl.short(longUrl)
        return reduced_url

    def post(self, request):
        data = request.data
        default_url = data["url"]
        userName = data["userName"]
        shorten_url = self.short(default_url)
        user = userUrls.objects.filter(userName = userName)
        if(len(user)):
            user_urls = userUrls.objects.get(userName = userName).urls
            newUrls = user_urls + ", " + shorten_url
            user.update(urls = newUrls)
            response = json.dumps({"urls": newUrls.split(",")})
        else:
            newUrls = shorten_url
            new_url = userUrls(userName = userName, urls = newUrls)
            new_url.save()
            response = json.dumps({"urls": newUrls})
        return HttpResponse(response, content_type = "application/json")
    
    



