FROM python:3.12

WORKDIR /usr/src/app

COPY ./server/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY ./server .

EXPOSE 8000

ENTRYPOINT [ "python", "manage.py" ]
CMD ["runserver", "0.0.0.0:8000"]