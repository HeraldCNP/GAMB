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

  /* Carpetas */
  getAllConta(limit?: number, skip?: number, area?: string, tipo?: string): Observable<any[]> {
    let dir = `${this.URL}/carpetas?limit=${limit}&skip=${skip}&area=${area}&tipo=${tipo}`;
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


  /* Archivos */
  getAllArchivos(limit?: number, skip?: number, area?: string): Observable<any[]> {
    let dir = `${this.URL}/contabilidades?limit=${limit}&skip=${skip}&area=${area}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  searchArchivo(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchConta/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }
}
