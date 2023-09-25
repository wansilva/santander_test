import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ApiService } from './services/api/api.service';
import { UsersService } from './services/users/users.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/list/users.component';
import { UserComponent } from './pages/users/user/user.component';
import { PaginationComponent } from './components/pagination/pagination/pagination.component';
import { UserAddComponent } from './pages/users/user-add/user-add.component';
import { UserFormComponent } from './components/form/user-form/user-form.component';
import { ConfirmComponent } from './components/confirm/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,
    UserComponent,
    PaginationComponent,
    UserAddComponent,
    UserFormComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ApiService,
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
