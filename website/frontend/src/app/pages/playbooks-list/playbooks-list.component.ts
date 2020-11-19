import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-playbooks-list',
  templateUrl: './playbooks-list.component.html',
  styleUrls: ['./playbooks-list.component.scss']
})
export class PlaybooksListComponent implements OnInit {
  playbooks : any
  
  onClick(){
    console.log("hehe");
    this.http.get('http://localhost:8000/api/ansible-tasks/playbooks').subscribe(
      res => {
        this.playbooks = res;
        console.log(res[0]['file']);
      }
      
    )
  }

  constructor(private http: HttpClient,
    ) {}
  ngOnInit(): void {
  }


}
