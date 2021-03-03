#!/bin/bash

# install sshpass
echo "Install sshpass"
#echo "deb http://deb.debian.org/debian buster stable" >> /etc/apt/sources.list
#apt-get install sshpass -y
wget https://altushost-swe.dl.sourceforge.net/project/sshpass/sshpass/1.08/sshpass-1.08.tar.gz -O sshpass.tar.gz
tar -xvf sshpass.tar.gz
cd ./sshpass-1.08
./configure
make install
cd ../
rm -dr ./sshpass-1.08

# make database migrations
echo "Make database migrations"
python3 manage.py makemigrations

# Apply database migrations
echo "Apply database migrations"
python3 manage.py migrate --noinput

# Start server
echo "Start server"
python3 manage.py runserver 0.0.0.0:8000