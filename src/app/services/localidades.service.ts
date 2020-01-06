import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  url = environment.wsUrl;

  constructor( private _http: HttpClient) { 

  }

  getEstados(){
    return this._http.get(`${this.url}/estados`)
  }

  getMunicipios(){
    return this._http.get(`${this.url}/municipios`)
  }

  getLocalidades(){
    return this._http.get(`${this.url}/localidades`)
  }
}
