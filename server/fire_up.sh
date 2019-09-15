#!/usr/bin/env bash

./wait-for-it.sh -q db:3306 -- python manage.py makemigrations \
&& python manage.py migrate \
&& python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin@example.com', 'admin', 'admin')" \
&& python manage.py runserver 0.0.0.0:5000