import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnsibleTaskComponent } from './pages/ansible-task/ansible-task.component';
import { AnsibleManagerComponent } from './pages/ansible-manager/ansible-manager.component';

import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


@NgModule({
  declarations: [
    AppComponent,
    AnsibleTaskComponent,
    AnsibleManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
