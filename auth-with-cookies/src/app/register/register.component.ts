import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth.service';
import { AlreadyExistService } from '../validators/already-exist.service';
import { RegisterValidators } from '../validators/register-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  inSubmittion = false;

  constructor(
    private _auth: AuthService,
    private router: Router,
    private alreadyExist: AlreadyExistService
  ) {}
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.alreadyExist.validate]
  );
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);
  confirm_password = new FormControl('');
  remember = new FormControl(false);

  registerInputs = [
    {
      label: 'Name',
      name: 'name',
      type: 'text',
      control: this.name,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      control: this.email,
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      control: this.password,
    },
    {
      label: 'Confirm Password',
      name: 'confirm_password',
      type: 'password',
      control: this.confirm_password,
    },
    {
      label: 'Remember me',
      name: 'remeber',
      type: 'checkbox',
      control: this.remember,
    },
  ];

  registerForm: FormGroup = new FormGroup(
    {
      name: this.name,
      email: this.email,
      password: this.password,
      remember: this.remember,
      confirm_password: this.confirm_password,
    },
    [RegisterValidators.match('password', 'confirm_password')]
  );

  ngOnInit(): void {}

  register() {
    this.inSubmittion = true;

    const { name, email, password, remember } = this.registerForm.value;
    this._auth.register({ name, email, password }).subscribe({
      next: (res) => {
        if (res) {
          this.loginAfterRegister({ email, password }, remember);
        }
      },
      error: () => {},
      complete: () => {},
    });
  }

  loginAfterRegister(credentials: User, remember: boolean) {
    this._auth.login(credentials).subscribe((res) => {
      if (res) {
        if (remember) {
          this._auth.setToken(res.accessToken);
          this.inSubmittion = false;
        }
        this.router.navigate(['']);
      }
    });
  }
}
