import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  testForm: FormGroup;
  shown = false;
  showLoginForm = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      input: ['', Validators.required],
    });
  }

  get f() {
    return this.testForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.testForm.invalid) {
      return;
    }
  }
}
