import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  mgntTasks = [{name: 'test'}];

  constructor(private api: ApiService) {
    this.getMgntTasks();
  }
  getMgntTasks = () => {
    this.api.getAllMgntTasks().subscribe(
      data => {
        this.mgntTasks = data;
      },
      error => {
        console.log(error);
      }
    )
  }
}
