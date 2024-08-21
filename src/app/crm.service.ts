import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preference } from './models/Preference.model';
import { Feedback } from './models/Feedback.model';
import { Loyalty } from './models/Loyalty.model';
import { Campaign } from './models/Campaign.model';
import { Reward } from './models/Reward.model';
import { RedeemRequest } from './models/RedeemRequest.model';

@Injectable({
  providedIn: 'root'
})
export class CrmService {

  private baseUrl = 'https://luxtavern-backend-production.up.railway.app/api/crm';  // Replace with your backend URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Get the token from localStorage
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    } else {
      throw new Error('No authentication token found');
    }
  }

  // Preferences
  getPreferences(customerId: number): Observable<Preference[]> {
    return this.http.get<Preference[]>(`${this.baseUrl}/customers/${customerId}/preferences`, {
      headers: this.getAuthHeaders()
    });
  }

  getPreference(customerId: number, preferenceId: number): Observable<Preference> {
    return this.http.get<Preference>(`${this.baseUrl}/customers/${customerId}/preferences/${preferenceId}`, {
      headers: this.getAuthHeaders()
    });
  }

  addOrUpdatePreference(customerId: number, preference: Preference): Observable<Preference> {
    return this.http.post<Preference>(`${this.baseUrl}/customers/${customerId}/preferences`, preference, {
      headers: this.getAuthHeaders()
    });
  }

  // Feedback
  getFeedback(customerId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/customers/${customerId}/feedback`, {
      headers: this.getAuthHeaders()
    });
  }

  getFeedbackById(customerId: number, feedbackId: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.baseUrl}/customers/${customerId}/feedback/${feedbackId}`, {
      headers: this.getAuthHeaders()
    });
  }

  addFeedback(customerId: number, feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrl}/customers/${customerId}/feedback`, feedback, {
      headers: this.getAuthHeaders()
    });
  }

  // Loyalty
  getLoyaltyInfo(customerId: number): Observable<Loyalty> {
    return this.http.get<Loyalty>(`${this.baseUrl}/customers/${customerId}/loyalty`, {
      headers: this.getAuthHeaders()
    });
  }

  updateLoyaltyPoints(customerId: number, loyalty: Loyalty): Observable<Loyalty> {
    return this.http.post<Loyalty>(`${this.baseUrl}/customers/${customerId}/loyalty`, loyalty, {
      headers: this.getAuthHeaders()
    });
  }

  redeemReward(customerId: number, redeemRequest: RedeemRequest): Observable<Reward> {
    return this.http.post<Reward>(`${this.baseUrl}/customers/${customerId}/redeem`, redeemRequest, {
      headers: this.getAuthHeaders()
    });
  }

  // Campaigns
  getAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.baseUrl}/campaigns`, {
      headers: this.getAuthHeaders()
    });
  }

  getCampaignById(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.baseUrl}/campaigns/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createOrUpdateCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(`${this.baseUrl}/campaigns`, campaign, {
      headers: this.getAuthHeaders()
    });
  }

  deleteCampaign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/campaigns/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
