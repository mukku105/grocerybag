# **'Reading Right'** Internship Stage 2 Assignment

## **Grocery Bag**

## You can view the live demo here-

mukku105.pythonanywhere.com

## Steps involved in Creating the project :

## - Start Django Project :

> ```
> django-admin startproject readingright_intern_grocerybag
> ```

## - Modify `settings.py` :

> 1.**Add `rest_framework` and `knox` to `INSTALLED_APPS`:**
>
> ```
> INSTALLED_APPS = [
>   . . .
>
>   'rest_framework',
>   'knox'
> ]
> ```
>
> 2.**Add `REST_FRAMEWORK` dictionary :**
>
> ```
> REST_FRAMEWORK = {
>   'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication',)
> }
> ```
>
> 3.**Add template folder to `TEMPLATES` :**
>
> ```
> TEMPLATES = [
>    {
>       . . .
>        'DIRS': [os.path.join(BASE_DIR, 'templates')],
>    }
> ]
> ```
>
> 4.**Configure `STATIC_<folders>` :**
>
> ```
> STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
> STATIC_URL = '/static/'
>
> STATICFILES_DIRS = [
>    os.path.join(BASE_DIR, 'assets')
> ]
>
> MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
> MEDIA_URL = '/media/'
> ```

## - Run Migration :

```
> py manage.py runserver

```

## - Create Superuser :

```
> py manage.py createsuperuser
```

## - Create Django Apps :

```
> django-admin startapp accounts
> django-admin startapp api
> django-admin startapp frontend
```
