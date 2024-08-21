// hotel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from './models/hotel.model';
import { HotelChain } from './models/hotel-chain.model';
import { HotelBrand } from './models/hotel-brand.model';
import { HotelPayload } from './models/HotelPayload.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'https://luxtavern-backend-production.up.railway.app/api/hotels';
  private chainsUrl = 'https://luxtavern-backend-production.up.railway.app/api/hotel-chains';  // Update with your backend URL
  private brandsUrl = 'https://luxtavern-backend-production.up.railway.app/api/hotel-brands';  // Update with your backend URL

  constructor(private http: HttpClient) { }

  getAllHotels(): Observable<Hotel[]> {
    const token = localStorage.getItem('authToken');
    return this.http.get<Hotel[]>(`${this.baseUrl}/all`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  getHotelById(id: number): Observable<Hotel> {
    const token = localStorage.getItem('authToken');
    return this.http.get<Hotel>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  deleteHotel(id: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  // hotel.service.ts
updateHotel(id: number, hotelPayload: HotelPayload): Observable<void> {
  const token = localStorage.getItem('authToken');
  return this.http.put<void>(`${this.baseUrl}/${id}`, hotelPayload, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}


  // hotel.service.ts
registerHotel(hotelPayload: HotelPayload): Observable<void> {
  const token = localStorage.getItem('authToken');
  return this.http.post<void>(`${this.baseUrl}/register`, hotelPayload, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}


  getAllHotelChains(): Observable<HotelChain[]> {
    const token = localStorage.getItem('authToken');
    return this.http.get<HotelChain[]>(`${this.chainsUrl}/all`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  getAllHotelBrands(): Observable<HotelBrand[]> {
    const token = localStorage.getItem('authToken');
    return this.http.get<HotelBrand[]>(`${this.brandsUrl}/all`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  // Hotel Chain Methods
getHotelChainById(id: number): Observable<HotelChain> {
  const token = localStorage.getItem('authToken');
  return this.http.get<HotelChain>(`${this.chainsUrl}/${id}`, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}

updateHotelChain(id: number, chain: HotelChain): Observable<void> {
  const token = localStorage.getItem('authToken');
  return this.http.put<void>(`${this.chainsUrl}/${id}`, chain, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}

addHotelChain(chain: HotelChain): Observable<void> {
  const token = localStorage.getItem('authToken');
  return this.http.post<void>(`${this.chainsUrl}`, chain, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}

deleteHotelChain(id: number): Observable<void> {
  const token = localStorage.getItem('authToken');
  return this.http.delete<void>(`${this.chainsUrl}/${id}`, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}
// Hotel Brand Methods
getHotelBrandById(id: number): Observable<HotelBrand> {
  const token = localStorage.getItem('authToken');
  return this.http.get<HotelBrand>(`${this.brandsUrl}/${id}`, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}

updateHotelBrand(id: number, brand: HotelBrand): Observable<void> {
  const token = localStorage.getItem('authToken');
  return this.http.put<void>(`${this.brandsUrl}/${id}`, brand, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}
addHotelBrand(brand: HotelBrand): Observable<void> {
  const token = localStorage.getItem('authToken');
  return this.http.post<void>(`${this.brandsUrl}`, brand, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}

deleteHotelBrand(id: number): Observable<void> {
  const token = localStorage.getItem('authToken');
  return this.http.delete<void>(`${this.brandsUrl}/${id}`, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
  });
}

}
