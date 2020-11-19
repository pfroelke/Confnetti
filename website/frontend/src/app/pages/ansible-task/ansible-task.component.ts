import { Component, OnInit, ɵConsole } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AnsibleTaskService } from 'src/app/services/task.service';

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

  onClickDisplayPlaybooks(){
    console.log("hehe");
    this.http.get<PlaybookName []>('http://localhost:8000/api/ansible-tasks/playbooks').subscribe(
      res => {
        console.log(JSON.parse(res).files);

        this.playbooks = JSON.parse(res).files;
        console.log(this.playbooks)
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
