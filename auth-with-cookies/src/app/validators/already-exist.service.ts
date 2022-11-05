import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlreadyExistService implements AsyncValidator {
  constructor(private auth: AuthService) {}

  validate = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    return this.auth
      .emailExist(control.value)
      .pipe(map((res) => (res ? { alreadyExist: true } : null)));
  };
}
