from django.db import models
# import datetime as dt

class user(models.Model):
    userName = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.userName

class userUrls(models.Model):
    userName = models.CharField(max_length=100)
    urls = models.TextField(max_length=200, null=True)

    def __str__(self):
        return self.userName
    
class allUrls(models.Model):
    urls = models.TextField()