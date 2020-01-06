import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroComerciosService {

  url = environment.wsUrl;

  constructor( private _http: HttpClient) {

  }

  addComercioCompleto(dataComercioCompleto: Object){
    return this._http.post(`${this.url}/registrocomercios`, dataComercioCompleto);
  }

}
