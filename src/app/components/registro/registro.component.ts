import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // expresionReg = "^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$";
  campoRequerido = "Este campo es requerido";

  usuario: Usuario = {
    nombreUsuario: null
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
  valorSexo = 'S';

  estado = [
    {
      id_estados: 1,
      nombre_estado: 'Durango'
    },
    {
      id_estados: 2,
      nombre_estado: 'Mazatlan'
    },
    {
      id_estados: 3,
      nombre_estado: 'Monterrey'
    },
    {
      id_estados: 4,
      nombre_estado: 'Aguascalientes'
    },
    {
      id_estados: 5,
      nombre_estado: 'Guadalajara'
    }
  ];
  municipio = [
    {
      id_municipios: 1,
      estado_id: 5,
      nombre_municipio: 'Jalisco'
    },
    {
      id_municipios: 2,
      estado_id: 4,
      nombre_municipio: 'Aguascalientes'
    },
    {
      id_municipios: 3,
      estado_id: 3,
      nombre_municipio: 'Nuevo Leon'
    },
    {
      id_municipios: 4,
      estado_id: 2,
      nombre_municipio: 'Sinaloa'
    },
    {
      id_municipios: 5,
      estado_id: 1,
      nombre_municipio: 'Durango'
    },
  ];
  localidad = [
    {
      id_localidades: 1,
      municipio_id: 5,
      nombre_localidad: 'De Durango',
      lat: 24.0277,
      lng: -104.653
    },
    {
      id_localidades: 2,
      municipio_id: 4,
      nombre_localidad: 'De Sinaloa',
      lat: 25.1533,
      lng: -108.1732
    },
    {
      id_localidades: 3,
      municipio_id: 3,
      nombre_localidad: 'De NL',
      lat: 25.6714,
      lng: -100.309
    },
    {
      id_localidades: 4,
      municipio_id: 2,
      nombre_localidad: 'De Aguasc',
      lat: 21.8818,
      lng: -102.291
    },
    {
      id_localidades: 5,
      municipio_id: 1,
      nombre_localidad: 'De Jalisco',
      lat: 20.6736,
      lng: -103.344
    },
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

  constructor() { }

  ngOnInit() {
  }

  registrar(forma: NgForm){
    // console.log(forma);
    if( this.selectedLocalidades === 0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese la informacion de Estado, Municipio y Localidad por favor'
      });
      return;
    }
    if(this.valorSexo === 'S'){
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

    if(forma.valid && this.selectedLocalidades!=0 && this.valorSexo!= 'S'){
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Comercio registrado correctamente'
      });
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
  }

  onSelectSexo(sexo: number){
    this.selectedSexo = sexo;
    this.valorSexo = 'S';
    const sex: any = this.sexos.filter((sexo)=>{
      return sexo.id === Number(this.selectedSexo);
    })
    if(sex.length>=1){
      this.valorSexo = sex[0].valor;
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