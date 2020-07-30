#!/usr/bin/env bash
cd /tmp
wget https://apt.puppetlabs.com/puppet6-release-bionic.deb
sudo dpkg -i puppet6-release-bionic.deb
sudo apt-get update
sudo apt-get install -y puppet-agent
echo "PATH=\"/opt/puppetlabs/bin:$PATH\"" > /etc/environment
sudo cp /vagrant/files/node/puppet.conf /etc/puppetlabs/puppet/
sudo echo "certname = $(hostname)" >> /etc/puppetlabs/puppet/puppet.conf
sudo echo -e "10.0.0.10\tmaster" >> /etc/hosts
sudo systemctl start puppet
sudo systemctl enable puppet