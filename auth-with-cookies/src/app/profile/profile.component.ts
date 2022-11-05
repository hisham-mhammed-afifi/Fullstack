import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  constructor(private _auth: AuthService, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    this._auth.logout().subscribe((res) => {
      if (res) {
        this.router.navigate(['login']);
      }
    });
  }
}
