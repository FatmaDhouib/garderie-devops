
Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-24.04"
  config.vm.hostname = "garderie-deploy"

  config.vm.network "private_network", ip: "192.168.56.10"

  config.vm.provider "virtualbox" do |vb|
    vb.name = "garderie-deploy"
    vb.memory = 2048
    vb.cpus = 2
  end

  # Install Ansible inside the guest VM.
  config.vm.provision "shell",
    inline: "apt-get update && apt-get install -y ansible"

  # Execute the Ansible playbook inside the guest.
  config.vm.provision "ansible_local" do |ansible|
    ansible.playbook = "ansible/playbook.yml"
    ansible.install = false
  end
end
