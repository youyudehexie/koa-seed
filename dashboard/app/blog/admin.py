from django.contrib import admin

# Register your models here.

from models import Category, Article

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'summary', 'count', 'primary_image']

class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'prefix', 'primary_image', 'category', 'status', 'created_at', 'updated_at']
    ordering = ['created_at']

admin.site.register(Category, CategoryAdmin)
admin.site.register(Article, ArticleAdmin)
