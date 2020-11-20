import { Component, OnInit, ɵConsole } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AnsibleTaskService } from 'src/app/services/task.service';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-ansible-task',
  templateUrl: './ansible-task.component.html',
  styleUrls: ['./ansible-task.component.scss']
})
export class AnsibleTaskComponent implements OnInit {
    
  playbooks : any
  selectedListPlaybook: string
  selectedFile = null;
  playbookStatus: string;
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0]
    console.log(event)
  }

  onUpload(){
    this.playbookStatus = "processing";
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:8000/api/ansible-tasks/', fd).subscribe(
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
        console.log(JSON.parse(res).files);

        this.playbooks = JSON.parse(res).files;
        console.log(this.playbooks);
      }
    )
  }

  onClickDownload(){
    console.log("<onclickdownload>");
    this.http.get<PlaybookName []>('http://localhost:8000/api/ansible-tasks/pb/'+this.selectedListPlaybook).subscribe(
      res => {
        fileSaver.saveAs(this.returnBlob(res), this.selectedListPlaybook)
        console.log(res);
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
    ) {
    }
  ngOnInit(): void {
  }


}

export interface PlaybookName{
  filename: string,
}
