FROM python:3
ENV PYTHONUNBUFFERED=1
RUN mkdir -p /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
EXPOSE 8000
CMD python3 manage.py migrate --noinput && python3 manage.py runserver 0.0.0.0:8000
