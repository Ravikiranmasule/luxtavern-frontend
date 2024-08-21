// src/app/staff.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from './models/Staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = 'https://luxtavern-backend-production.up.railway.app/api/staff';

  private getAuthHeaders():HttpHeaders{
    const token=localStorage.getItem('authToken');
    if(token){
      return new HttpHeaders().set('Authorization',`Bearer ${token}`);
    }
    else{
      throw new Error('No authentication token found');
    }
  }

  constructor(private http: HttpClient) {}

  getAllStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.apiUrl,
      {headers: this.getAuthHeaders()});
  }

  getStaffById(id: number): Observable<Staff> {
    return this.http.get<Staff>(`${this.apiUrl}/${id}`,{
      headers:this.getAuthHeaders()
    });
  }

  createStaff(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.apiUrl, staff,{
      headers:this.getAuthHeaders()
    });
  }

  updateStaff(id: number, staff: Staff): Observable<Staff> {
    return this.http.put<Staff>(`${this.apiUrl}/${id}`, staff,{
      headers:this.getAuthHeaders()
    });
  }

  deleteStaff(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{
      headers:this.getAuthHeaders()
    });
  }
}
