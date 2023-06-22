import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  private readonly URL = environment.api;

  constructor(private http: HttpClient) {
  }

     /* Conta */
     getAllConta(limit?: number, skip?: number, area?: string): Observable<any[]> {
      let dir = `${this.URL}/carpetas?limit=${limit}&skip=${skip}&area=${area}`;
      console.log(dir);
      return this.http.get<any>(dir);
    }


    createConta(form: any, id: any): Observable<any> {
      let dir = `${this.URL}/addArea/${id}`;
      return this.http.put<any>(dir, form)
    }

    getSingleCarpeta(id: any): Observable<any> {
      let dir = `${this.URL}/carpeta/${id}`;
      return this.http.get<any>(dir);
    }

}
