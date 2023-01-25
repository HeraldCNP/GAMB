import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlmacenService {
  private readonly URL = environment.api;
  constructor(private http: HttpClient) {}

  /*Servicios para Categorias*/
  getAllCategorias(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/categoria?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createCategoria(form: any): Observable<any> {
    let dir = `${this.URL}/categoria`;
    return this.http.post<any>(dir, form);
  }

  searchCategoria(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchCat/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deleteCategoria(id: any) {
    let dir = `${this.URL}/categoria/${id}`;
    return this.http.delete<any>(dir, id);
  }
  /*End Servicios para Categorias*/

  /*Programas */
  getAllProgramas(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/programas?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  getSinglePrograma(id: any): Observable<any> {
    let dir = `${this.URL}/programa/${id}`;
    return this.http.get<any>(dir);
  }

  createPrograma(form: any): Observable<any> {
    let dir = `${this.URL}/programa`;
    return this.http.post<any>(dir, form);
  }

  searchPrograma(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchProg/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deletePrograma(id: any) {
    let dir = `${this.URL}/programa/${id}`;
    return this.http.delete<any>(dir, id);
  }
  /*End Programas*/

  /*Proyectos */
  getAllProyectos(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/proyectos?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createProyecto(form: any): Observable<any> {
    let dir = `${this.URL}/proyecto`;
    return this.http.post<any>(dir, form);
  }

  searchProyecto(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchProg/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deleteProyecto(id: any) {
    let dir = `${this.URL}/programa/${id}`;
    return this.http.delete<any>(dir, id);
  }
  /*End Actividades*/

  /* Proyectos */
  getAllActividades(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/actividades?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createActividad(form: any): Observable<any> {
    let dir = `${this.URL}/actividad`;
    return this.http.post<any>(dir, form);
  }

  searchActividad(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchActividad/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deleteActividad(id: any) {
    let dir = `${this.URL}/actividad/${id}`;
    return this.http.delete<any>(dir, id);
  }
  /*End Proyectos*/

  /* Proveedores */
  getAllProveedores(limit?: number, skip?: number): Observable<any[]> {
    let dir = `${this.URL}/proveedores?limit=${limit}&skip=${skip}`;
    console.log(dir);
    return this.http.get<any>(dir);
  }

  createProveedor(form: any): Observable<any> {
    let dir = `${this.URL}/proveedor`;
    return this.http.post<any>(dir, form);
  }

  searchProveedor(termino: any): Observable<any[]> {
    let dir = `${this.URL}/searchProveedor/${termino}`;
    console.log(dir);
    return this.http.get<any[]>(dir);
    // .pipe(
    //   map((resp:any) => resp.serverResponse)
    // );
  }

  deleteProveedor(id: any) {
    let dir = `${this.URL}/proveedor/${id}`;
    return this.http.delete<any>(dir, id);
  }


  /* End Proveedores */
}