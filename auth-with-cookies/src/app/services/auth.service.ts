import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface User {
  name?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BaseURL = environment.baseURL + '/auth';

  constructor(private _http: HttpClient) {}

  register(credentials: User): Observable<boolean> {
    return this._http.post<boolean>(this.BaseURL + '/register', credentials);
  }

  login(credentials: User): Observable<{ accessToken: string }> {
    return this._http
      .post<{ accessToken: string }>(this.BaseURL + '/login', credentials)
      .pipe(
        tap((res) => {
          sessionStorage.setItem('acccessToken', res.accessToken);
        })
      );
  }

  logout(): Observable<boolean> {
    return this._http.delete<boolean>(this.BaseURL + '/logout').pipe(
      tap(() => {
        this.removeToken();
      })
    );
  }

  emailExist(email: string): Observable<boolean> {
    return this._http.post<boolean>(this.BaseURL + '/alreadyexist', {email});
  }

  setToken(token: string) {
    localStorage.setItem('acccessToken', token);
    sessionStorage.setItem('acccessToken', token);
  }

  getToken() {
    return (
      localStorage.getItem('acccessToken') ||
      sessionStorage.getItem('acccessToken')
    );
  }

  removeToken() {
    localStorage.removeItem('acccessToken');
    sessionStorage.removeItem('acccessToken');
  }
}
