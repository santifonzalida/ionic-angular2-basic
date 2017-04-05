import { Injectable } from '@angular/core';
import { Lista } from '../clases/listas'


@Injectable()
export class ListaDeseosService {

  listas:Lista[] = [];

  constructor() {
    console.log("Servicio inicializado");
    this.cargarData();
  }

    actualizadData(){
      localStorage.setItem( "data", JSON.stringify(this.listas));
    }
    cargarData(){
      if(localStorage.getItem("data")){
        this.listas = JSON.parse(localStorage.getItem("data"));
      }
    }
    agregarLista(lista:Lista){
      this.listas.push(lista);
      this.actualizadData();
    }

    eliminarLista(nombre:string){
      for(let i=0; i < this.listas.length; i ++){
        if(nombre == this.listas[i].nombre){
          this.listas.splice(i, 1);
          this.actualizadData();
        }else {
          console.log("no hay coincidencias");
        }
      }
    }

}
