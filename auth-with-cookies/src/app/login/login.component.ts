import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  inSubmittion = false;

  constructor(private _auth: AuthService, private router: Router) {}
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  remember = new FormControl(false);
  loginInputs = [
    { label: 'Email', name: 'email', type: 'email', control: this.email },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      control: this.password,
    },
    {
      label: 'Remember me',
      name: 'remeber',
      type: 'checkbox',
      control: this.remember,
    },
  ];

  loginForm: FormGroup = new FormGroup({
    email: this.email,
    password: this.password,
    remember: this.remember,
  });

  ngOnInit(): void {}

  login() {
    this.inSubmittion = true;

    const { email, password, remember } = this.loginForm.value;
    this._auth.login({ email, password }).subscribe({
      next: (res) => {
        if (res) {
          if (remember) {
            this._auth.setToken(res.accessToken);
            this.inSubmittion = false;
          }
          this.router.navigate(['']);
        }
      },
      error: () => {},
      complete: () => {},
    });
  }
}
