FROM python:3
ENV PYTHONUNBUFFERED=1
RUN mkdir -p /backend
WORKDIR /backend
COPY requirements.txt /backend/
RUN pip install -r requirements.txt
COPY . /backend/
EXPOSE 8000
CMD python3 manage.py runserver 0.0.0.0:8000