from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
import subprocess
from subprocess import call
import time

def index(request):
    return render(request, 'static/index.html', {})
    

def start_vagrant(request):
    a = ServerHandler()
    a.start_vagrant()
    return HttpResponse("Vagrant is started.")

class ServerHandler():

    SERVER_CONTROL_IN_FILE_PATH = "/home/szymon/vagrant_try/Confnetti/cfg_mgnt_tools/cfg_master_input.txt"
    SERVER_CONTROL_OUT_FILE_PATH = "/home/szymon/vagrant_try/Confnetti/cfg_mgnt_tools/cfg_master_output.txt"

    def start_vagrant(self):
        with open(self.SERVER_CONTROL_IN_FILE_PATH, "r+") as f:
            content = f.writelines("start env")
        while True:
            time.sleep(1)
            with open(self.SERVER_CONTROL_OUT_FILE_PATH, "r+") as f:
                content = f.readlines()
                if content:
                    f.truncate(0)
                    break
