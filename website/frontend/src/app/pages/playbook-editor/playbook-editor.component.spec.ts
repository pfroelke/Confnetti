import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybookEditorComponent } from './playbook-editor.component';

describe('PlaybookEditorComponent', () => {
  let component: PlaybookEditorComponent;
  let fixture: ComponentFixture<PlaybookEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaybookEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybookEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
