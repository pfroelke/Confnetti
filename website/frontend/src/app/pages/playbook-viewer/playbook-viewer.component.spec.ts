import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookViewerComponent } from './playbook-viewer.component';

describe('PlaybookViewerComponent', () => {
  let component: PlaybookViewerComponent;
  let fixture: ComponentFixture<PlaybookViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
