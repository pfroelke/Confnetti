# Final thesis project
Dev-Ops infrastructure for network management
--- description TBD ---


### How to setup?
Install virtualbox and vagrant

### How to use?
This will setup whole environment
```sh
$ cd cfg_mgnt_tools
$ vagrant up
```
There will be 5 VMs available - 1x sever + 4x client
In order to connect to one of them, you can use:
```sh
$ vagrant ssh vagrant@[ip_address_of_vm]
```
Sample ansible cmd:
```sh
$ ansible-playbook -i hosts.yml playbook.yml
```
Sample salt-ssh cmd:
```sh
sudo salt-ssh '*' cmd.run "sudo hostname newhostname"
```

To run website
```sh
python3 manage.py runserver
```
Then website will be visibile at: http://127.0.0.1:8000/cfg_mgr/


---
This description will change, please don't rely on it.
