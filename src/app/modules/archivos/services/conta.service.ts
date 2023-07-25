import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  private readonly URL = environment.api;
<<<<<<< HEAD
 // private readonly URL2 = environment.apiLocal;
=======
>>>>>>> 023f0753854316aaa63feace7713bedbe9d74ffe

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

  registerPreven(fd: FormData, id: string): Observable<any> {
    let dir = `${this.URL}/addAreaArch/${id}`;
    // console.log(dir);
    return this.http.put<any>(dir, fd, {
      reportProgress: true,
      observe: 'events',
    })
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

  getSingleArchivo(id: any): Observable<any> {
    let dir = `${this.URL}/contabilidad/${id}`;
    return this.http.get<any>(dir)
  }
}
