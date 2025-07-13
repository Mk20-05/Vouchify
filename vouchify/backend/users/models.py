# myapp/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(AbstractUser):
    """
    Replaces Django’s default User. We authenticate with firebase_uid,
    but still keep username/email fields around so DRF admin etc. work.
    """
    firebase_uid   = models.CharField(max_length=128, unique=True)
    email_verified = models.BooleanField(default=False)

    USERNAME_FIELD  = "firebase_uid"      # log‑in field
    REQUIRED_FIELDS = ["email"]           # ask for email during createsuperuser

    def __str__(self):
        # fall back to UID if email not set
        return self.email or f"UID‑{self.firebase_uid}"


class UserProfile(models.Model):
    """
    Extra information shown on the /profile route.
    A 1‑to‑1 link (same PK) keeps queries efficient and avoids duplication.
    """
    user        = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile"
    )
    phone       = models.CharField(max_length=15, blank=True)
    address     = models.TextField(blank=True)
    bio         = models.TextField(blank=True)
    dob         = models.DateField(null=True, blank=True)
    profile_pic = models.URLField(blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Profile for {self.user}"


# --- Signals ---------------------------------------------------------------

@receiver(post_save, sender=CustomUser)
def create_or_update_profile(sender, instance, created, **kwargs):
    """
    1. When a new CustomUser is created -> make a blank profile row.
    2. When an existing CustomUser is saved -> make sure profile exists.
    """
    if created:
        UserProfile.objects.create(user=instance)
    else:
        # In rare cases profile may not exist (e.g. manual SQL import)
        UserProfile.objects.get_or_create(user=instance)
