import pyshorteners
from django.http import HttpResponse
from rest_framework.views import APIView
from .models import *
import json
import string
import random
import ast


# CLASS FOR USER SIGNUP
class signup(APIView):

    def post(self, request):

        try:
            data = request.data
            userName = data["userName"]
            password = data["password"]

            user_data = user.objects.filter(userName = userName)

            if(len(user_data)):
                resp = "USERNAME ALREADY EXISTS"
                status = 403
            else:
                new_user = user(userName = userName, password = password)
                new_user.save()
                resp = "USER CREATED"
                status = 200

        except :
            resp = "SERVER ERROR"
            status = 500

        return HttpResponse(resp, status=status)



# CLASS FOR USER LOGIN
class login(APIView):

    def post(self, request):

        try :
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
                resp = "USERNAME NOT FOUND"
                status = 400
        
        except :
            resp = "SERVER ERROR"
            status = 500

        return HttpResponse(resp, status = status)
    


# CLASS FOR FORGOT PASSWORD
class forgot_password(APIView):

    def post(self, request):

        try :
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
        
        except :
            resp = "SERVER ERROR"
            status = 500

        return HttpResponse(resp, status = status)
    


#CLASS FOR ALL USER URLS

class usersUrls(APIView) : 

    def post(self, request):

        try:
            data = request.data
            userName = data["userName"]
            try:
                user_urls = userUrls.objects.get(userName = userName).urls
                user_urls_dict = ast.literal_eval(user_urls)
                response = json.dumps({"urls": list(user_urls_dict.keys())[:200]})
                status = 200
            except:
                response = "NO URLS FOUND"
                status = 404

        except :
            resp = "SERVER ERROR"
            status = 500

        return HttpResponse(response, content_type="application/json", status=status)




# CLASS FOR MAKING URL SHORT
class shortUrl(APIView) :

    def generate_random_string(self):
        length = random.randint(5, 9)
        characters = string.ascii_letters + string.digits
        random_chars = [random.choice(characters) for _ in range(length)]
        return ''.join(random_chars)

    def post(self, request):

        try: 
            data = request.data
            default_url = data["url"]
            userName = data["userName"]
            try:
                shorten_url = self.generate_random_string()
                user = userUrls.objects.filter(userName = userName)
                if(len(user)):
                    user_urls = userUrls.objects.get(userName = userName).urls
                    user_urls_dict = ast.literal_eval(user_urls)
                    user_urls_dict[shorten_url] = default_url
                    user.update(urls = user_urls_dict)
                    response = json.dumps({"urls": list(user_urls_dict.keys()), "short": shorten_url})
                else:
                    newUrls = {shorten_url: default_url}
                    new_url = userUrls(userName = userName, urls = newUrls)
                    new_url.save()
                    response = json.dumps({"urls": list(newUrls.keys()), "short": shorten_url})

                newUrl = allUrls(userUrl = default_url, shortenUrl = shorten_url)
                newUrl.save()
                status = 200

            except:
                response = "SOME ERROR OCCURED"
                status = 500

        except :
            resp = "SERVER ERROR"
            status = 500

        return HttpResponse(response, content_type = "application/json", status = status)
    
    def get(self, request):
        return HttpResponse("get request")
        

# CLASS FOR MAPPING URL
class mapUrl(APIView):

    def post(self, request):

        try :
            data = request.data
            shorten_url = data["url"]
            try:
                default_url = allUrls.objects.get(shortenUrl = shorten_url).userUrl
                response = json.dumps({"url": default_url})
                status = 200
            except:
                response = "SERVER ERROR"
                status = 400

        except :
            resp = "SERVER ERROR"
            status = 500
        return HttpResponse(response, content_type = "application/json", status = status)