import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-@o7x!ys)%q$m--3-vdoa4x@hd*6nx(fh0sy(^*7u3a3%8$@5=2'

DEBUG = True

ALLOWED_HOSTS = []

STATIC_DIR = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }
