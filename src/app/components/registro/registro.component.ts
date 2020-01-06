import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegistroComerciosService } from '../../services/registro-comercios.service';
import { LocalidadesService } from '../../services/localidades.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  campoRequerido = "Este campo es requerido";

  usuario = {
    nombre_comercio: null
  }

  sexos = [
    {
      id: 1,
      valor: 'F',
      sexo: 'Femenino'
    },
    {
      id: 2,
      valor: 'M',
      sexo: 'Masculino'
    }
  ];
  selectedSexo = 0;
  sexo_app = 'S';

  estado = [
    {
      id_estados: 1,
      nombre_estado: 'Durango'
    }
  ];
  municipio = [
    {
      id_municipios: 1,
      estado_id: 5,
      nombre_municipio: 'Jalisco'
    }
  ];
  localidad = [
    {
      id_localidades: 1,
      municipio_id: 5,
      nombre_localidad: 'De Durango',
      lat: 24.0277,
      lng: -104.653
    }
  ];

  // 
  filtro_municipios = [];
  filtro_localidades = [];

  selectedEstados = 0;
  selectedMunicipios = 0;
  selectedLocalidades = 0;

  // Informaciòn utilizada por el mapa
  latitud = 0;
  longitud = 0 ;

  folio_comercio = 0;

  constructor( private _registroComercio: RegistroComerciosService,
               private _getLocalidades: LocalidadesService) { 
  
  // TRAER LA LISTA DE ESTADOS, MUNICIPIOS Y LOCALIDADES
  this.getEstMunLoc();
  this.folio_comercio = new Date().getTime();
                 
  }

  ngOnInit() {
  }

  getEstMunLoc(){
    this._getLocalidades.getEstados().subscribe( (estados: any) => {
      if(estados.ok){
        this.estado = estados.estados;
      }
    });
    this._getLocalidades.getMunicipios().subscribe( (municipios: any) => {
      if(municipios.ok){
        this.municipio = municipios.municipios;
      }
    });
    this._getLocalidades.getLocalidades().subscribe( (localidades: any) => {
      if(localidades.ok){
        this.localidad = localidades.localidades;
      }
    });
  }

  registrar(forma: NgForm){

    if( this.selectedLocalidades === 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese la informacion de Estado, Municipio y Localidad por favor'
      });
      return;
    }
    if(this.sexo_app === 'S'){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione sexo por favor'
      });
      return;
    }
    if(!forma.valid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete todos los datos por favor'
      });
      return;
    }

    if(forma.valid && this.selectedLocalidades!=0 && this.sexo_app!= 'S'){

      let data_comercio = forma.control.value;
      data_comercio.lat_dir = this.latitud;
      data_comercio.lgn_dir = this.longitud;
      data_comercio.id_localidad = this.selectedLocalidades;
      data_comercio.sexo_app = this.sexo_app;
      data_comercio.folio_comercio = this.folio_comercio;
  
      console.log(forma);
  
      this._registroComercio.addComercioCompleto(data_comercio).subscribe((res: any) => {
        // console.log(res);
        if(res.ok){
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Comercio registrado correctamente'
          });
          return;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al registrar comercio',
            text: res.error.sqlMessage
          });
          console.log(res.error);
          return;
        }
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          text: `Validar que esté bien escrita la información por favor.`
        });
        console.log(err);
        return;
      })
    }

  }

  agregarMarcador(evento){
    this.latitud = evento.coords.lat;
    this.longitud = evento.coords.lng;
    console.log(evento.coords);

  }

  onSelectEstado(id_estado: number) {
    this.selectedEstados = id_estado;
    this.selectedMunicipios = 0;
    this.selectedLocalidades = 0;
    this.filtro_localidades = [];
    this.latitud = 0;
    this.longitud = 0;
    this.filtro_municipios = this.municipio.filter( (municipio) => {
      return municipio.estado_id === Number(id_estado);
    });
    // console.log(id_estado);
  }

  onSelectMunicipio(id_municipio: number){
    this.selectedMunicipios = id_municipio;
    this.selectedLocalidades = 0;
    this.latitud = 0;
    this.longitud = 0;
    this.filtro_localidades = this.localidad.filter((localidad) => {
      return localidad.municipio_id === Number(id_municipio);
    });
  }

  onSelectLocalidad(id_localidad: number){
    this.selectedLocalidades = id_localidad;
    const loc: any = this.localidad.filter((localidad) => {
      return localidad.id_localidades === Number(id_localidad);
    });
    if(loc.length>=1){
      this.latitud = loc[0].lat;
      this.longitud = loc[0].lng;
    }
    // console.log();
  }

  onSelectSexo(sexo: number){
    this.selectedSexo = sexo;
    this.sexo_app = 'S';
    const sex: any = this.sexos.filter((sexo)=>{
      return sexo.id === Number(this.selectedSexo);
    })
    if(sex.length>=1){
      this.sexo_app = sex[0].valor;
    }
  }

}


interface Usuario{
  nombreUsuario?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  sexo?: string;
  fechaNacimiento?: string;
  telefonoMovil?: string;
  padecimientos?: string;
  alergias?: string;
  tipoSangre?: string;
  tipoUsuario?: string;
}