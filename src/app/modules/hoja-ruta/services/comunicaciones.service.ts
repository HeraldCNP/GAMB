import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionesService {
  termino: EventEmitter<string> = new EventEmitter<string>;
  constructor() { }
}
