#!/usr/bin/env bash
cd /tmp
wget https://apt.puppetlabs.com/puppet6-release-bionic.deb
sudo dpkg -i puppet6-release-bionic.deb
sudo apt-get update
sudo apt-get install -y puppetserver
echo "PATH=\"/opt/puppetlabs/bin:$PATH\"" > /etc/environment
sudo systemctl stop puppetserver.service
sudo ufw allow 8140
sudo cp /vagrant/files/master/puppet.conf /etc/puppetlabs/puppet/
sudo cp /vagrant/files/master/testing_manifest.pp /etc/puppetlabs/code/environments/production/manifests/
sudo cp /vagrant/files/master/puppetserver /etc/default/
chmod 644 /etc/default/puppetserver
sudo systemctl start puppetserver.service
sudo systemctl enable puppetserver.service