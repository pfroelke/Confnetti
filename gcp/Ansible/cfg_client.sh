#!/bin/bash
sudo sed -i -e '/PubkeyAuthentication/s/yes/no/' /etc/ssh/sshd_config
sudo sed -i -e '/PasswordAuthentication/s/no/yes/' /etc/ssh/sshd_config
sudo systemctl restart ssh.service
# or
# sudo service ssh restart
