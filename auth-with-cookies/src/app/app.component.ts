import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'auth-with-cookies';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()) {
      this.auth.removeToken();
    }
  }
}
