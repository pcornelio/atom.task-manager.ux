import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, switchMap } from 'rxjs';

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterData {
  email: string;
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api-rewxlpbppa-uc.a.run.app';
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _token = new BehaviorSubject<string | null>(null);
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient) {
    // Verificar si hay un token almacenado
    const storedToken = this.getStoredToken();
    if (storedToken) {
      this._token.next(storedToken);
      this._isAuthenticated.next(true);
    }
  }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  get token(): string | null {
    return this._token.value;
  }

  get authHeaders(): HttpHeaders {
    const token = this.token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setStoredToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeStoredToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/users/login`, { email, password })
      .pipe(
        tap(response => {
          this._token.next(response.token);
          this._isAuthenticated.next(true);
          this.setStoredToken(response.token);
        })
      );
  }

  register(data: RegisterData): Observable<LoginResponse> {
    return this.http.post<User>(`${this.apiUrl}/api/users`, data)
      .pipe(
        switchMap(() => this.login(data.email, data.password))
      );
  }

  logout(): void {
    this._token.next(null);
    this._isAuthenticated.next(false);
    this.removeStoredToken();
  }
} 