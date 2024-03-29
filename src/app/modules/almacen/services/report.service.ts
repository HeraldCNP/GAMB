import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) { }



  getAllCompras(): Observable<any[]> {
    let dir = `${this.URL}/compras`;
    // console.log(dir);
    return this.http.get<any>(dir);
  }





}



