import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { first } from 'rxjs/operators';
import { Response } from 'src/app/models/response';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  testForm: FormGroup;
  response: Response;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
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

    const { name, description } = this.testForm.value;
    const task = this.testForm.value;

    this.taskService
      .postTask(task)
      .pipe(first())
      .subscribe(
        (data) => {
          // this.alertService.success('Registration successful', true);
          console.log('Task post successful!');
          console.log(data);
          this.response = data;
        },
        (error) => {
          // this.alertService.error(error.error);
          console.log('Task post failed!');
          console.log(error.error);
        }
      );
  }
}
