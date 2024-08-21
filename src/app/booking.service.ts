import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './models/Booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'https://luxtavern-backend-production.up.railway.app/api/bookings';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<Booking[]> {
    const token = localStorage.getItem('authToken');
    return this.http.get<Booking[]>(this.baseUrl, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  getBookingById(id: number): Observable<Booking> {
    const token = localStorage.getItem('authToken');
    return this.http.get<Booking>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  createBooking(booking: Booking): Observable<Booking> {
    const token = localStorage.getItem('authToken');
    return this.http.post<Booking>(this.baseUrl, booking, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  updateBooking(id: number, booking: Booking): Observable<Booking> {
    const token = localStorage.getItem('authToken');
    return this.http.put<Booking>(`${this.baseUrl}/${id}`, booking, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  cancelBooking(id: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }
}
