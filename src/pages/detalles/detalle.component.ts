import { Component, OnInit } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { ListaItem } from '../../app/clases/lista-item';
import { Lista } from '../../app/clases/listas';
import { ListaDeseosService } from '../../app/services/lista-deseos.service';
import { AlertController } from 'ionic-angular';
import { PendientesComponent } from '../../pages/pendientes/pendientes.component';

@Component({
  selector: 'app-detalle',
  templateUrl: 'detalle.component.html',
})

export class DetalleComponent implements OnInit {

  idx:number;
  lista:Lista;

  constructor( public navCtrl:NavController,
               public navPrms: NavParams,
               public _deseosService:ListaDeseosService,
               public alertCtrl: AlertController) {
    this.idx = this.navPrms.get("idx");
    this.lista = this.navPrms.get("lista");
   }

    ngOnInit() {}

    actualizar(item:ListaItem){
      item.completado = !item.completado;

      let todosMarcados = true;
      for(let item of this.lista.items){
        if(!item.completado){
          todosMarcados = false;
          break;
        }
      }
      this.lista.terminada = todosMarcados;

      this._deseosService.actualizadData();
    }

    borrarLista(nombreLista:string){
      let confirm = this.alertCtrl.create({
        title: 'Atención!!!',
        message: 'Desea eliminar la lista?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Cancelar clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: () => {
              this._deseosService.eliminarLista(nombreLista);
              this.navCtrl.pop( PendientesComponent );
              console.log('Aceptar clicked');
            }
          }
        ]
      });
      confirm.present();
  }


}
