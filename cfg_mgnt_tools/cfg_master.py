import time
import subprocess

class CfgMaster():
    def start(self): 
        print ("Configuration master started.")
        print ("waiting for next command")
        input_file_path = "cfg_master_input.txt"
        while True:
            time.sleep(1)
            with open(input_file_path, "r+") as f:
                content = f.readlines()
                if content:
                    f.truncate(0)
            if content:
                print ("got command")
                self.controlUnit(content[0])
                print ("waiting for next command")

    def controlUnit(self, content):
        output_file_path = "cfg_master_output.txt"
        if content == "start env":
            print ("setting up vagrant")
            a = subprocess.run(["vagrant up"], shell=True)
            with open(output_file_path, "r+") as f:
                f.writelines("vagrant setting up completed")
        else:
            print ("command: {} is not supported".format(content))

cfg_master = CfgMaster()
cfg_master.start()
