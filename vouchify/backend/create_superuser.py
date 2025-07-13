#!/usr/bin/env python
import os
import sys
import django

# Add the project directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vouchify_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from users.models import CustomUser

User = get_user_model()

# Create superuser
try:
    user = User.objects.create_superuser(
        username='admin',
        email='madhan9688465646@gmail.com',
        password='MK2005',
        firebase_uid='admin-uid'
    )
    print(f"Superuser created successfully: {user.username}")
except Exception as e:
    print(f"Error creating superuser: {e}")
    # Try to get existing user
    try:
        user = User.objects.get(username='admin')
        user.set_password('MK2005')
        user.save()
        print(f"Superuser password updated: {user.username}")
    except User.DoesNotExist:
        print("Could not create or update superuser") 