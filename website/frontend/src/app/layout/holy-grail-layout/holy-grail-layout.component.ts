import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holy-grail-layout',
  templateUrl: './holy-grail-layout.component.html',
  styleUrls: ['./holy-grail-layout.component.scss'],
})
export class HolyGrailLayoutComponent implements OnInit {
  sidenavWidth: number = 240;
  sidenavBackdrop: boolean = false;
  sidenavOpened: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
