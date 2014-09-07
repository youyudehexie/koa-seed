from django.db import models

import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )

# Create your models here.

ARTICLE_STATUS = (
    (0, u'published'),
    (1, u'draft'),
)

class Category(models.Model):
    name = models.CharField(max_length=50, db_index=True, unique=True)
    summary = models.CharField(max_length=400, blank=True, null=True)
    count = models.IntegerField(default=0)
    primary_image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=50, db_index=True)
    prefix = models.CharField(max_length=50, db_index=True, unique=True)
    primary_image = models.URLField(blank=True)
    summary = models.CharField(max_length=100, blank=True)
    content = models.TextField()
    category = models.ForeignKey(Category)
    status = models.SmallIntegerField(max_length=10, choices=ARTICLE_STATUS, default=0)
    updated_at = models.DateField(auto_now_add=True, auto_now=True)
    created_at = models.DateField(auto_now_add=True, db_index=True)

    def __str__(self):
        return self.title
