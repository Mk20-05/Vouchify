# from pathlib import Path
# from decouple import config
# import os, django

# # ─────────────────────────────────────────
# # Base paths
# # ─────────────────────────────────────────
# BASE_DIR = Path(__file__).resolve().parent.parent

# # ─────────────────────────────────────────
# # Security
# # ─────────────────────────────────────────
# SECRET_KEY = config("DJANGO_SECRET_KEY", default="unsafe-default-key")
# DEBUG = config("DEBUG", default=True, cast=bool)
# ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="127.0.0.1,localhost").split(",")

# # ─────────────────────────────────────────
# # Applications
# # ─────────────────────────────────────────
# # ─────────────────────────────────────────
# # Applications
# # ─────────────────────────────────────────
# INSTALLED_APPS = [
#     "users",                       # ← CUSTOM APP FIRST!
#     "django.contrib.admin",
#     "django.contrib.auth",
#     "django.contrib.contenttypes",
#     "django.contrib.sessions",
#     "django.contrib.messages",
#     "django.contrib.staticfiles",
#     "rest_framework",
#     "corsheaders", 
#      "rest_framework",
#     "rest_framework_simplejwt",
# ]

# REST_FRAMEWORK = {
#     "DEFAULT_AUTHENTICATION_CLASSES": [
#         "users.authentication.FirebaseAuthentication",
#     ],
#     "DEFAULT_PERMISSION_CLASSES": [
#         "rest_framework.permissions.IsAuthenticated",
#     ],
# }

# # ─────────────────────────────────────────
# # Auth
# # ─────────────────────────────────────────
# AUTH_USER_MODEL = "users.CustomUser"




# # ─────────────────────────────────────────
# # Middleware
# # ─────────────────────────────────────────
# MIDDLEWARE = [
#     "corsheaders.middleware.CorsMiddleware",  # ← Add this
#     "django.middleware.security.SecurityMiddleware",
#     "django.contrib.sessions.middleware.SessionMiddleware",
#     "django.middleware.common.CommonMiddleware",
#     "django.middleware.csrf.CsrfViewMiddleware",
#     "django.contrib.auth.middleware.AuthenticationMiddleware",
#     "django.contrib.messages.middleware.MessageMiddleware",
#     "django.middleware.clickjacking.XFrameOptionsMiddleware",
# ]

# # ─────────────────────────────────────────
# # URLs / WSGI
# # ─────────────────────────────────────────
# ROOT_URLCONF = "vouchify_backend.urls"
# WSGI_APPLICATION = "vouchify_backend.wsgi.application"

# # ─────────────────────────────────────────
# # Templates
# # ─────────────────────────────────────────
# TEMPLATES = [
#     {
#         "BACKEND": "django.template.backends.django.DjangoTemplates",
#         "DIRS": [],
#         "APP_DIRS": True,
#         "OPTIONS": {
#             "context_processors": [
#                 "django.template.context_processors.debug",
#                 "django.template.context_processors.request",
#                 "django.contrib.auth.context_processors.auth",
#                 "django.contrib.messages.context_processors.messages",
#             ],
#         },
#     },
# ]

# # ─────────────────────────────────────────
# # Database (SQLite for dev)
# # ─────────────────────────────────────────
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": BASE_DIR / "db.sqlite3",
#     }
# }

# # ─────────────────────────────────────────
# # Auth
# # ─────────────────────────────────────────
# AUTH_USER_MODEL = "users.CustomUser"

# # ─────────────────────────────────────────
# # Password validation
# # ─────────────────────────────────────────
# AUTH_PASSWORD_VALIDATORS = [
#     {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
#     {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
#     {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
#     {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
# ]

# # ─────────────────────────────────────────
# # i18n / tz
# # ─────────────────────────────────────────
# LANGUAGE_CODE = "en-us"
# TIME_ZONE = "UTC"
# USE_I18N = True
# USE_TZ = True

# # ─────────────────────────────────────────
# # Static files
# # ─────────────────────────────────────────
# STATIC_URL = "static/"

# # ─────────────────────────────────────────
# # Misc
# # ─────────────────────────────────────────
# DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# # ─────────────────────────────────────────
# # Firebase credentials file
# # ─────────────────────────────────────────
# GOOGLE_APPLICATION_CREDENTIALS = config(
#     "GOOGLE_APPLICATION_CREDENTIALS", default="firebase_credentials.json"
# )

 
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:5173",  # React Vite dev server
# ]




"""
Django settings for the Vouchify backend
"""

from pathlib import Path
from datetime import timedelta
from decouple import config  # pip install python-decouple
import os

# ─────────────────────────────────────────
# Base directory
# ─────────────────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent

# ─────────────────────────────────────────
# Security
# ─────────────────────────────────────────
SECRET_KEY = config("DJANGO_SECRET_KEY", default="unsafe-default-key")
DEBUG = config("DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="127.0.0.1,localhost").split(",")

# ─────────────────────────────────────────
# Installed apps
# ─────────────────────────────────────────
INSTALLED_APPS = [
    # Your own apps
    "users",

    # Django core
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third‑party
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
]

# ─────────────────────────────────────────
# Middleware
# ─────────────────────────────────────────
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",        # must be first
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ─────────────────────────────────────────
# URL / WSGI
# ─────────────────────────────────────────
ROOT_URLCONF = "vouchify_backend.urls"
WSGI_APPLICATION = "vouchify_backend.wsgi.application"

# ─────────────────────────────────────────
# Templates
# ─────────────────────────────────────────
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],                        # Add template paths here if needed
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# ─────────────────────────────────────────
# Database (SQLite for dev, PostgreSQL for production)
# ─────────────────────────────────────────
import dj_database_url

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Use PostgreSQL in production
DATABASE_URL = config("DATABASE_URL", default=None)
if DATABASE_URL:
    DATABASES["default"] = dj_database_url.parse(DATABASE_URL)

# ─────────────────────────────────────────
# Custom user model
# ─────────────────────────────────────────
AUTH_USER_MODEL = "users.CustomUser"

# ─────────────────────────────────────────
# Password validation
# ─────────────────────────────────────────
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ─────────────────────────────────────────
# Internationalisation
# ─────────────────────────────────────────
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ─────────────────────────────────────────
# Static files
# ─────────────────────────────────────────
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# Add whitenoise middleware for static files
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

# Enable whitenoise compression and caching
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# ─────────────────────────────────────────
# Default primary key field
# ─────────────────────────────────────────
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ─────────────────────────────────────────
# Firebase credentials (ID‑token verification)
# ─────────────────────────────────────────
GOOGLE_APPLICATION_CREDENTIALS = config(
    "GOOGLE_APPLICATION_CREDENTIALS",
    default=str(BASE_DIR / "firebase_credentials.json")
)

# ─────────────────────────────────────────
# Django‑REST‑framework configuration
# ─────────────────────────────────────────
REST_FRAMEWORK = {
    # Django will try each auth class in order
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        # "users.authentication.FirebaseAuthentication",  # Temporarily disabled
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

# ─────────────────────────────────────────
# Simple‑JWT settings (tweak as you like)
# ─────────────────────────────────────────
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# ─────────────────────────────────────────
# CORS (for React Vite dev server and production)
# ─────────────────────────────────────────
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://vouchify-frontend.onrender.com",  # Add your frontend URL
    "https://vouchify-backend.onrender.com",   # Add your backend URL
]
CORS_ALLOW_CREDENTIALS = True
