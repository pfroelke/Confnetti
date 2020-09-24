# git_cookbook

TODO: Enter the cookbook description here.

Get chef workstation from:
https://downloads.chef.io/products/workstation

Have updated vagrant:
https://www.vagrantup.com/downloads

Have updated VirtualBox:
https://www.virtualbox.org/wiki/Downloads

Use kitchen tool to set virtual machines up.
kitchen.yml has description of what and how is going to be set up.
/recipes/default.rb contain commands to be done on clients.
In test/integration/default/default_test.rb is a test to check if vms have commands accomplished.

Try:
$ kitchen create default-ubuntu-2004

Then:
$ kitchen verify default-ubuntu-2004

Next:
$ kitchen test

Eventualy:
$ kitchen destroy