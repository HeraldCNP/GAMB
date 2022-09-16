import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ListSliderI } from '../models/listSlider.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly URL = environment.api;
  // private readonly URL = 'http://192.168.1.120:8000/api';
  
  constructor(private http:HttpClient) { }
  /*Servicios para Slider*/
  getAllSliders():Observable<ListSliderI[]>{
    let dir = `${this.URL}/slaider`;
    return this.http.get<ListSliderI[]>(dir)
  }

  sendSlider(fd: FormData):Observable<any>{
    let dir = `${this.URL}/uploadslider`;
    return this.http.post<any>(dir, fd)
  }

  getSingleSlider(id:any):Observable<any>{
    let dir = `${this.URL}/slaider/${id}`;
    return this.http.get<any>(dir)
  }

  sendUpdateSlider(fd: FormData, id:any):Observable<any>{
    let dir = `${this.URL}/uploadslider/${id}`;
    return this.http.post<any>(dir, fd)
  }

  deleteSlider(id:any):Observable<any>{
    let dir = `${this.URL}/slaider/${id}`;
    return this.http.delete<any>(dir, id)
  }
  /*Finish Servicios para Slider*/

  /*Servicios para Post*/
  getAllPosts():Observable<any[]>{
    let dir = `${this.URL}/blog`;
    return this.http.get<any[]>(dir)
  }

  getAllCategories():Observable<any[]>{
    let dir = `${this.URL}/category`;
    return this.http.get<any[]>(dir)
  }

  registerPost(fd: FormData):Observable<any>{
    let dir = `${this.URL}/uploadpost`;
    return this.http.post<any>(dir, fd)
  }

  getSinglePost(id:any):Observable<any>{
    let dir = `${this.URL}/blog/${id}`;
    return this.http.get<any>(dir)
  }

  sendUpdatePost(fd: FormData, id:any):Observable<any>{
    let dir = `${this.URL}/uploadpost/${id}`;
    return this.http.post<any>(dir, fd)
  }



  deletePost(id:any):Observable<any>{
    let dir = `${this.URL}/blog/${id}`;
    return this.http.delete<any>(dir, id)
  }

}