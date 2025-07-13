# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.response import Response
# from django.http import HttpResponse

# def homepage(request):
#     return HttpResponse("Welcome to Vouchify! 🎉")

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def hello(request):
#     return Response({"msg": f"Hi, {request.user.email or request.user.firebase_uid}!"})

# # New: open endpoint to verify a token round‑trip
# @api_view(["POST"])
# @permission_classes([AllowAny])
# def token_echo(request):
#     """
#     Expects JSON:  { "idToken": "<firebase ID token>" }
#     Returns UID and e‑mail if token is valid.
#     """
#     id_token = request.data.get("idToken")
#     if not id_token:
#         return Response({"error": "No idToken supplied"}, status=400)

#     from firebase_admin import auth
#     try:
#         decoded = auth.verify_id_token(id_token)
#         return Response(
#             {
#                 "uid": decoded["uid"],
#                 "email": decoded.get("email"),
#                 "email_verified": decoded.get("email_verified"),
#             }
#         )
#     except Exception as e:
#         return Response({"error": str(e)}, status=400)



# users/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.http import HttpResponse

from .models import UserProfile
# from firebase_admin import auth  # Temporarily disabled


# Public: welcome message
def homepage(request):
    return HttpResponse("Welcome to Vouchify! 🎉")


# Authenticated: say hello
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def hello(request):
    return Response({"msg": f"Hi, {request.user.email or request.user.firebase_uid}!"})


# Public: verify Firebase token (manual roundtrip)
# @api_view(["POST"])
# @permission_classes([AllowAny])
# def token_echo(request):
#     """
#     Expects JSON:  { "idToken": "<firebase ID token>" }
#     Returns UID and email if valid.
#     """
#     id_token = request.data.get("idToken")
#     if not id_token:
#         return Response({"error": "No idToken supplied"}, status=400)
# 
#     try:
#         decoded = auth.verify_id_token(id_token)
#         return Response({
#             "uid": decoded["uid"],
#             "email": decoded.get("email"),
#             "email_verified": decoded.get("email_verified"),
#         })
#     except Exception as e:
#         return Response({"error": str(e)}, status=400)


# Create or return user profile
@api_view(["POST"])
@permission_classes([AllowAny])
def get_or_create_profile(request):
    """
    Expects JSON: {
      "uid": "firebase-uid",
      "email": "user@example.com",
      "name": "User Name"
    }
    """
    data = request.data
    uid = data.get("uid")
    email = data.get("email")
    name = data.get("name")

    if not uid or not email or not name:
        return Response({"error": "Missing required fields"}, status=400)

    profile, created = UserProfile.objects.get_or_create(
        firebase_uid=uid,
        defaults={"email": email, "name": name}
    )

    return Response({
        "email": profile.email,
        "name": profile.name,
        "phone": profile.phone,
        "address": profile.address,
        "bio": profile.bio,
        "dob": profile.dob,
        "profile_pic": profile.profile_pic,
        "created_at": profile.created_at,
        "created": created
    })
