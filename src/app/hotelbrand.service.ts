// hotel-brand.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelBrand } from './models/hotel-brand.model';


@Injectable({
  providedIn: 'root'
})
export class HotelBrandService {

  private apiUrl = 'https://luxtavern-backend-production.up.railway.app/api/hotel-brands';

  constructor(private http: HttpClient) {}

  getAllHotelBrands(): Observable<HotelBrand[]> {
    return this.http.get<HotelBrand[]>(this.apiUrl);
  }

  getHotelBrandById(id: number): Observable<HotelBrand> {
    return this.http.get<HotelBrand>(`${this.apiUrl}/${id}`);
  }

  createHotelBrand(hotelBrand: HotelBrand): Observable<HotelBrand> {
    return this.http.post<HotelBrand>(this.apiUrl, hotelBrand);
  }

  updateHotelBrand(id: number, hotelBrand: HotelBrand): Observable<HotelBrand> {
    return this.http.put<HotelBrand>(`${this.apiUrl}/${id}`, hotelBrand);
  }

  deleteHotelBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
