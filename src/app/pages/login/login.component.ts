import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  typePassword = "password";

  imageLogotipo = "assets/images/logo-santander-white.svg";
  imageWansilva = "assets/images/logo-wansilva.png";

  
  iconPerson = "assets/icons/black/person.png";
  iconLockOpen = "assets/icons/black/lock-open.png";
  iconLockClosed = "assets/icons/black/lock-closed.png";

  title = "Acessar Conta";
  recover = "Recuperar Senha";
  register = "Cadastrar";

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  togglePassword() {
    this.typePassword = (this.typePassword === "password") ? "text" : "password";
  }

  sendLogin() {
    if (this.loginForm.valid) {
      this.router.navigate(["/users"]);
    } else {
    }
  }
}
