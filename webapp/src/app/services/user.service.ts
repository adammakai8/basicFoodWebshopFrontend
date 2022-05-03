import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    console.log(loginData);
    return this.http.post(environment.serverUrl + '/api/login', loginData);
  }

  logout(): Observable<any> {
    return this.http.post(environment.serverUrl + '/api/logout', {}, { withCredentials: true });
  }

  registerUser(userData: any): Observable<any> {
    return this.http.put(environment.serverUrl + '/api/register', userData);
  }
}
