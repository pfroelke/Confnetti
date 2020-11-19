import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './layout/app.component';
import { AppRoutingModule } from './app-routing.module';
import { HolyGrailLayoutComponent } from './layout/holy-grail-layout/holy-grail-layout.component';
import { IndexComponent } from './pages/index/index.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AnsibleTaskComponent } from './pages/ansible-task/ansible-task.component';
import { PlaybooksListComponent } from './pages/playbooks-list/playbooks-list.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    HolyGrailLayoutComponent,
    IndexComponent,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    TestPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoginComponent,
    RegisterComponent,
    AnsibleTaskComponent,
    PlaybooksListComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
