import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ansible-manager',
  templateUrl: './ansible-manager.component.html',
  styleUrls: ['./ansible-manager.component.scss']
})
export class AnsibleManagerComponent implements OnInit {

  playbooks : any;
  selectedListPlaybook= "";
  selectedHostsFile = File;
  selectedFile = File;
  playbookStatus= "";

  onPlaybookFileSelected(event){
    console.log("text");
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
  }

  onHostsFileSelected(event){
    this.selectedHostsFile = <File>event.target.files[0];
    console.log(event);
  }

  onUploadAndRun(){
    this.playbookStatus = "processing";
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:8000/api/ansible-tasks/', fd).subscribe(
      res => {
        this.playbookStatus = res
      }
    ) 
  }

  onUploadHosts(){
    this.playbookStatus = "uploaded hosts file";
    const fd = new FormData();
    fd.append('image', this.selectedHostsFile, this.selectedHostsFile.name)
    this.http.post('http://localhost:8000/api/ansible-tasks/hosts', fd).subscribe(  /// esdfwegwergw
      res => {
        this.playbookStatus = res
      }
    ) 
  }

  returnBlob(res): Blob{
    console.log("file downloaded");
    return new Blob([res], {type: ''});
  }

  onClickDisplayPlaybooks(){
    console.log("<debug display playbooks onclick>");
    this.http.get<PlaybookName []>('http://localhost:8000/api/ansible-tasks/playbooks').subscribe(
      res => {
        console.log("<display");
        console.log(res);
        console.log(JSON.parse(res).files);

        this.playbooks = JSON.parse(res).files;
        console.log(this.playbooks);
      }
    )
  }

  onClickDownload(){
    // download playbook file from backend
    console.log("<onclickdownload>");
    this.http.get('http://localhost:8000/api/ansible-tasks/pb/'+this.selectedListPlaybook).subscribe(
      res => {
        console.log("<download");
        console.log(res);
        fileSaver.saveAs(this.returnBlob(res), this.selectedListPlaybook)
        
      }
    )
  }

  onClickRunFromList(){
    this.playbookStatus = "processing";
    console.log("<onclicklistRun>");
    this.http.get<PlaybookName []>('http://localhost:8000/api/ansible-tasks/pbrun/'+this.selectedListPlaybook).subscribe(
      res => {
        this.playbookStatus = res
      }
    )
  }


  playbookListClick(playbookName){
      this.selectedListPlaybook = playbookName
  }



  constructor(private http: HttpClient,
    ) {}

  ngOnInit(): void {
  }


}
