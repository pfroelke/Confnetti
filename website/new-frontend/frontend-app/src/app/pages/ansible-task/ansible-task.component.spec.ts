import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsibleTaskComponent } from './ansible-task.component';

describe('AnsibleTaskComponent', () => {
  let component: AnsibleTaskComponent;
  let fixture: ComponentFixture<AnsibleTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsibleTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsibleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
