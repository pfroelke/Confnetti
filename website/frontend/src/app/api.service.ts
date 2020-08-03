import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = "http://127.0.0.1:8000"

  constructor(private http: HttpClient) { }

  getAllMgntTasks(): Observable<any>{
    return this.http.get(this.baseURL + '/cfg_mgnt/')
  }
}
