// src/app/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './models/Room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'https://luxtavern-backend-production.up.railway.app/api/rooms';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      throw new Error('No authentication token found');
    }
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.baseUrl, room, {
      headers: this.getAuthHeaders()
    });
  }

  updateRoom(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/${id}`, room, {
      headers: this.getAuthHeaders()
    });
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
