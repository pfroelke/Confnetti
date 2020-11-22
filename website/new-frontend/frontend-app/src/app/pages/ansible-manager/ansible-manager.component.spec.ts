import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsibleManagerComponent } from './ansible-manager.component';

describe('AnsibleManagerComponent', () => {
  let component: AnsibleManagerComponent;
  let fixture: ComponentFixture<AnsibleManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsibleManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsibleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
