import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HolyGrailLayoutComponent } from './layout/holy-grail-layout/holy-grail-layout.component';
import { IndexComponent } from './pages/index/index.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
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
    ],
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
