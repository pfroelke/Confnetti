# Puppet
Puppet testing environment with master and two agent nodes.

## Setup
```sh
$ vagrant up
```
Sign agent nodes' certificates.
```sh
$ vagrant ssh master
$ sudo puppetserver ca sign --all
```

## Testing
Puppet agents pull the configuration from the master server periodically. To manually pull config, run on agent node:
```sh
$ puppet agent -t
```

## Configuration
Puppetserver requires a minimum of 1Gb RAM to run. To change the memory allocation, edit 
```
JAVA_ARGS="-Xms1024m -Xmx1024m"
```
in `/etc/default/puppetserver`

To change node names, edit `/etc/puppetlabs/puppet/`

Testing manifest path `/etc/puppetlabs/code/environments/production/manifests/testing_manifest.pp`
