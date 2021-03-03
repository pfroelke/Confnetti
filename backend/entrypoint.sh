#!/bin/bash

# # Make database migrations
# echo "Make database migrations"
# python manage.py makemigrations

# In case of changes in models
echo "Apply model changes"
python manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000