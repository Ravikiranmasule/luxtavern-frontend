import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrder } from './models/PurchaseOrder.model';
import { PurchaseOrderPayload } from './models/PurchaseOrderPayload.model';
 // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private baseUrl = 'https://luxtavern-backend-production.up.railway.app/api/inventory/orders'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      throw new Error('No authentication token found');
    }
  }

  getAllPurchaseOrders(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.baseUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getPurchaseOrder(id: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createPurchaseOrder(payload: PurchaseOrderPayload): Observable<void> {
    return this.http.post<void>(this.baseUrl, payload, {
      headers: this.getAuthHeaders()
    });
  }

  updatePurchaseOrder(id: number, payload: PurchaseOrderPayload): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload, {
      headers: this.getAuthHeaders()
    });
  }

  deletePurchaseOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
