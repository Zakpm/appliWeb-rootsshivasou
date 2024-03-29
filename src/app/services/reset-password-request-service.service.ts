import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentResetPassword } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordRequestServiceService {
  private apiUrl = environmentResetPassword.apiUrl; // Remplace par l'URL de API

  constructor(private http: HttpClient) { }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email }, { responseType: 'text' });
  }
}
