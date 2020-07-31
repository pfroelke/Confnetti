node /^node(\d+)$/ {
	$node_number = $1
	include dc_role::dc_node
	notify {"node_number: ${node_number}, 1: ${1}":}
}

class dc_role::dc_node {
	notify {"dc_node: node_number: ${node_number}, 1: ${1}":}
	dc_func::set_hostname("node${node_number}_modified")
}

function dc_func::set_hostname(String $name) {
	notify {"set_hostname: node_number: ${node_number}, 1: ${1}":}
	exec { 'set hostname':
		command => "hostnamectl set-hostname ${name}",
		logoutput => on_failure,
		path => ['/bin', '/usr/bin', '/usr/sbin']
	}
}
