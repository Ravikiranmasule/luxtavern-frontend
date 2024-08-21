// inventory-item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from './models/InventoryItem.model';
import { InventoryItemPayload } from './models/InventoryItemPayload.model';


@Injectable({
  providedIn: 'root'
})
export class InventoryItemService {
  private apiUrl = 'https://luxtavern-backend-production.up.railway.app/api/inventory/items';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      throw new Error('No authentication token found');
    }
  }

  getInventoryItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getInventoryItem(id: number): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createInventoryItem(item: InventoryItemPayload): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.apiUrl, item, { headers: this.getAuthHeaders() });
  }

  updateInventoryItem(item: InventoryItemPayload, id: number): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/${id}`, item, { headers: this.getAuthHeaders() });
  }

  deleteInventoryItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
