import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import { distinctUntilChanged, tap, first, catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { AppConfig } from '../config/app-config';
import { Jwt } from '../models/jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private pathAPI = this.config.get('PathAPI');

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  private privateUser: User;

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private config: AppConfig) {
    this.isLoggedIn();
  }

  getUsers(): Observable<User[]> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<User[]>(`${this.pathAPI}/User`, { headers: header });
  }

  getById(id: string): Observable<User> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<User>(`${this.pathAPI}/User/${id}`, {
      headers: header,
    });
  }

  register(user: User) {
    return this.http.post(`${this.pathAPI}/User/Register`, user);
  }

  login(userName: string, password: string) {
    return this.http
      .post<{ jwt: Jwt; user: User }>(`${this.pathAPI}/User/Login`, {
        userName,
        password,
      })
      .pipe(
        tap((res) => {
          this.isAuthenticatedSubject.next(true);
          localStorage.setItem('id', res.user.id);
          localStorage.setItem('auth_token', res.jwt.token);
          localStorage.setItem('exp', (res.jwt.expires as unknown) as string);
          this.currentUserSubject.next(res.user);
        })
      );
  }

  logOut() {
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);

    localStorage.removeItem('id');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('exp');
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  isLoggedIn() {
    const token = localStorage.getItem('auth_token');
    if (token == null) {
      return Promise.resolve(false);
    }
    return new Promise((resolve) => {
      this.http
        .get(`${this.pathAPI}/User/isLoggedIn`)
        .pipe(first())
        .subscribe(
          (data) => {
            const id = localStorage.getItem('id');
            this.getById(id)
              .pipe(first())
              .subscribe((user) => {
                this.privateUser = user;
                this.currentUserSubject.next(user);
                this.isAuthenticatedSubject.next(true);
              });
            resolve(true);
          },
          (error) => {
            this.logOut();
            console.log(error.error);
            resolve(false);
          }
        );
    });
  }

  // update(user: User) {
  //     return this.http.put(`${this.pathAPI}/User/${user.id}`, user);
  // }

  // delete(id: number) {
  //     return this.http.delete(`${this.pathAPI}/User/${id}`);
  // }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
