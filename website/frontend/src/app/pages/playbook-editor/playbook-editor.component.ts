import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-playbook-editor',
  templateUrl: './playbook-editor.component.html',
  styleUrls: ['./playbook-editor.component.scss']
})
export class PlaybookEditorComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  openDialog(){
    console.log("<text>");
};
}
