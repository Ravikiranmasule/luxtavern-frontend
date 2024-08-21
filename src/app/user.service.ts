import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from './models/jwtresponse.model';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://luxtavern-backend-production.up.railway.app/api/users';
  private rolesUrl = 'https://luxtavern-backend-production.up.railway.app/api/users/roles'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`, { username, password });
  }

  register(user: User): Observable<JwtResponse> {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    if (token) {
      return this.http.post<JwtResponse>(`${this.baseUrl}/register`, user, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      });
    } else {
      throw new Error('No authentication token found');
    }
  }

  getUserById(id: number): Observable<User> {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    if (token) {
      return this.http.get<User>(`${this.baseUrl}/${id}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      });
    } else {
      throw new Error('No authentication token found');
    }
  }

  getAllUsers(): Observable<User[]> {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    return this.http.get<User[]>(`${this.baseUrl}/all`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  deleteUser(id: number): Observable<void> {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }
  updateUser(id: number, user: User): Observable<void> {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    return this.http.put<void>(`${this.baseUrl}/${id}`, user, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }
  getRoles(): Observable<string[]> {
    const token = localStorage.getItem('authToken');
    return this.http.get<string[]>(this.rolesUrl, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

 
}
