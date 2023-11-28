import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}`);
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${url}`, data);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${url}`, data);
  }

  patch<T>(url: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}${url}`, data);
  }

  delete(url: string) {
    return this.http.delete(`${this.apiUrl}${url}`);
  }
}