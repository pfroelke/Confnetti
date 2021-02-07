import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holy-grail-layout',
  templateUrl: './holy-grail-layout.component.html',
  styleUrls: ['./holy-grail-layout.component.scss'],
})
export class HolyGrailLayoutComponent implements OnInit {
  sidenavWidth: number = 220;
  sidenavOpened: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
