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
In test/integration/default/default_test.rb is a test to check if vm has git installed.

Try:
$ kitchen create default-ubuntu-2004

And then:
$ kitchen verify default-ubuntu-2004

Eventualy:
$ kitchen destroy