On gcp vm with nested virtualization enabled, installed and configured VirtualBox, installed Vagrant:
  - vagrant up
  - vagrant ssh to every client: vagrant ssh client[1-4]
  - do script: /vagrant/cfg_client.sh
  - vagrant ssh server
  - do ansible playbook: ansible-playbook -i /vagrant/hosts.yml /vagrant/playbook.yml

