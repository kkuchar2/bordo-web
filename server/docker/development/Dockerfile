FROM python:3.6

COPY wait-for-it.sh /
COPY fire_up.sh /

COPY server /code
COPY manage.py /code
COPY requirements.txt /code

WORKDIR code

RUN pip install --upgrade pip
RUN pip install -r requirements.txt