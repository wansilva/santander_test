import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/list/users.component';
import { UserComponent } from './pages/users/user/user.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { UserAddComponent } from './pages/users/user-add/user-add.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "users",
    component: UsersComponent,
  },
  {
    path: "users/id/:id",
    component: UserComponent,
  },
  {
    path: "users/add",
    component: UserAddComponent,
  },
  {
    path: "users/edit/:id",
    component: UserEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
