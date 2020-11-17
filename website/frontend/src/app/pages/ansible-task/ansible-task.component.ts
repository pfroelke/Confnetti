import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AnsibleTaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-ansible-task',
  templateUrl: './ansible-task.component.html',
  styleUrls: ['./ansible-task.component.scss']
})
export class AnsibleTaskComponent implements OnInit {
    

  selectedFile = null;
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0]
    console.log(event)
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:8000/api/ansible-tasks/', fd).subscribe(
      res => {
        console.log(res);
      }
    )
  }

  constructor(private http: HttpClient,
    ) {}
  ngOnInit(): void {
  }

}
