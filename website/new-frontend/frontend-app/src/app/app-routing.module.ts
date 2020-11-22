import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnsibleTaskComponent } from './pages/ansible-task/ansible-task.component';
import { AnsibleManagerComponent } from './pages/ansible-manager/ansible-manager.component';

const routes: Routes = [  {
  path: '',
  children: [
    { path: 'ansible-task', component: AnsibleTaskComponent },
    { path: 'ansible-manager', component: AnsibleManagerComponent },
  ],
},

{ path: '**', redirectTo: '' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
