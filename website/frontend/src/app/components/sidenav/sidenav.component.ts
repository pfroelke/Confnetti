import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() opened: boolean = false;
  @Input() width: string;

  constructor(private renderer: Renderer2, private ref: ElementRef) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.ref.nativeElement, 'width', this.width + 'px');
    this.opened ? this.open() : this.close();
  }

  open() {
    this.renderer.setStyle(this.ref.nativeElement, 'left', '0px');
    this.opened = true;
  }

  close() {
    this.renderer.setStyle(
      this.ref.nativeElement,
      'left',
      '-' + this.width + 'px'
    );
    this.opened = false;
  }

  toggle() {
    this.opened ? this.close() : this.open();
  }
}
