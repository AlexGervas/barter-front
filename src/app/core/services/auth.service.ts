import { Injectable } from '@angular/core';
import { Authorization } from '../models/authorization';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public signIn(userLogin: string, userPass: string): Observable<User> {
    const obj: Authorization = {
      login: userLogin
    };
    const rez: string = JSON.stringify(obj);
    sessionStorage.setItem('login', rez);
    const body = {
      email: userLogin,
      password: userPass
    };
    return this.http.post<User>(`${environment.apiUrl}/user/auth`, body);
  }

  public receiveLoginFromStorage(): string {
    const res: string = sessionStorage.getItem('login');
    const authObj: Authorization = JSON.parse(res);
    return authObj ? authObj.login : null;
  }

  public receiveIdFromStorage(): number {
    const res: string = sessionStorage.getItem('userId');
    return JSON.parse(res);
  }

  public removeKeys(): void {
    // tslint:disable-next-line:forin
    for (const key in sessionStorage) {
      sessionStorage.removeItem(key);
    }
  }

}
