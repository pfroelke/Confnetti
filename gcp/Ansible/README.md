On gcp vm with nested virtualization enabled, installed and configured VirtualBox, installed Vagrant:
  - vagrant up
  - do commands in cfg_client for every client
  - vagrant ssh server
  - do ansible playbook: ansible-playbook -i /vagrant/hosts.yml /vagrant/playbook.yml

