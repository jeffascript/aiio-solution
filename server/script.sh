#! /bin/bash
echo "create migrations"
python manage.py makemigrations api
echo "=================================================="

echo "migrate"
python manage.py migrate

echo "start server"
python manage.py runserver 0.0.0.0:8000
