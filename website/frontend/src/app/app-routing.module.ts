import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HolyGrailLayoutComponent } from './layout/holy-grail-layout/holy-grail-layout.component';
import { IndexComponent } from './pages/index/index.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { PlaybooksListComponent } from './pages/playbooks-list/playbooks-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: HolyGrailLayoutComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'test', component: TestPageComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'playbooks-list', component: PlaybooksListComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
