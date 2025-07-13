# # vouchify_backend/urls.py
# from django.contrib import admin
# from django.urls import path
# from users.views import homepage, hello
# from users.views import homepage, hello, token_echo
# from . import views

# urlpatterns = [
#     path("", homepage, name="home"),        # root URL
#     path("admin/", admin.site.urls),
#     path("api/hello/", hello, name="api-hello"),
#     path("api/token-echo/", token_echo, name="api-token-echo"),
# ]



# vouchify_backend/urls.py

from django.contrib import admin
from django.urls import path
from users import views     # one import line brings in all view functions

urlpatterns = [
    # Public root page
    path("", views.homepage, name="home"),

    # Django admin
    path("admin/", admin.site.urls),

    # API endpoints
    path("api/hello/",       views.hello,             name="api-hello"),        # requires authentication
    # path("api/token-echo/",  views.token_echo,        name="api-token-echo"),   # Firebase ID‑token check - temporarily disabled
    path("api/profile/",     views.get_or_create_profile, name="api-profile"),  # create / fetch user profile
]
