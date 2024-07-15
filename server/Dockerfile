# Set the base image to use to Ubuntu
FROM ubuntu:14.04
FROM python:3.12

# Update the default application repository sources list
RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y git
RUN apt-get install -y vim
RUN apt-get install -y nginx

COPY ./server/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY ./server .

EXPOSE 8000

# Copy entrypoint script into the image
COPY ./server/docker-entrypoint.sh /
COPY ./server/django_nginx.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/django_nginx.conf /etc/nginx/sites-enabled
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
ENTRYPOINT ["/docker-entrypoint.sh"]