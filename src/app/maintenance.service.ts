// src/app/maintenance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaintenanceRequest } from './models/MaintenanceRequest.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = 'https://luxtavern-backend-production.up.railway.app/api/maintenance';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Retrieve the token from localStorage or another secure place
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

  getAllRequests(): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getRequestById(id: number): Observable<MaintenanceRequest> {
    return this.http.get<MaintenanceRequest>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createRequest(request: MaintenanceRequest): Observable<MaintenanceRequest> {
    return this.http.post<MaintenanceRequest>(this.apiUrl, request, { headers: this.getHeaders() });
  }

  updateRequest(id: number, request: MaintenanceRequest): Observable<MaintenanceRequest> {
    return this.http.put<MaintenanceRequest>(`${this.apiUrl}/${id}`, request, { headers: this.getHeaders() });
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getRequestsByRoom(roomId: number): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(`${this.apiUrl}/room/${roomId}`, { headers: this.getHeaders() });
  }

  getRequestsByTechnician(technicianId: number): Observable<MaintenanceRequest[]> {
    return this.http.get<MaintenanceRequest[]>(`${this.apiUrl}/technician/${technicianId}`, { headers: this.getHeaders() });
  }

  getRequestStatuses(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/request-status`, { headers: this.getHeaders() });
  }
}
