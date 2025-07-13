# users/authentication.py
from decouple import config
import firebase_admin
from firebase_admin import credentials, auth, exceptions as fb_exc
from rest_framework import authentication, exceptions
from django.contrib.auth import get_user_model

# Load the service‑account JSON (env var points to it)
cred = credentials.Certificate(config("GOOGLE_APPLICATION_CREDENTIALS"))
firebase_admin.initialize_app(cred)

User = get_user_model()

class FirebaseAuthentication(authentication.BaseAuthentication):
    """
    Expects  Authorization: Bearer <firebase ID token>
    """
    keyword = "Bearer"

    def authenticate(self, request):
        hdr = authentication.get_authorization_header(request).split()
        if not hdr or hdr[0].lower() != b"bearer":
            return None  # no token supplied

        token = hdr[1].decode()
        try:
            decoded = auth.verify_id_token(token)
        except fb_exc.FirebaseError:
            raise exceptions.AuthenticationFailed("Invalid Firebase ID token")

        if not decoded.get("email_verified", False):
            raise exceptions.AuthenticationFailed("Email not verified in Firebase")

        uid   = decoded["uid"]
        email = decoded.get("email", "")

        user, _ = User.objects.get_or_create(
            firebase_uid=uid,
            defaults={"email": email, "username": uid, "email_verified": True},
        )
        return (user, None)
