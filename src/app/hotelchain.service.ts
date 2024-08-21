// hotel-chain.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelChain } from './models/hotel-chain.model';


@Injectable({
  providedIn: 'root'
})
export class HotelChainService {

  private apiUrl = 'https://luxtavern-backend-production.up.railway.app/api/hotel-chains';

  constructor(private http: HttpClient) {}

  getAllHotelChains(): Observable<HotelChain[]> {
    return this.http.get<HotelChain[]>(this.apiUrl);
  }

  getHotelChainById(id: number): Observable<HotelChain> {
    return this.http.get<HotelChain>(`${this.apiUrl}/${id}`);
  }

  createHotelChain(hotelChain: HotelChain): Observable<HotelChain> {
    return this.http.post<HotelChain>(this.apiUrl, hotelChain);
  }

  updateHotelChain(id: number, hotelChain: HotelChain): Observable<HotelChain> {
    return this.http.put<HotelChain>(`${this.apiUrl}/${id}`, hotelChain);
  }

  deleteHotelChain(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
