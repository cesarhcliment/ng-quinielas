import { Component, OnInit } from '@angular/core';
import { PartidosService } from '../partidos.service';
import { Partido, PartidoLista } from '../partido';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private partidosService: PartidosService) { }

  partidos: PartidoLista[] = [];
  errorAPI: boolean = false;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.cargarPartidos();
  }
  
  cargarPartidos() {
    this.partidosService.getPartidos().subscribe({
      next: (data: PartidoLista[]) => {
        this.partidos = data;
      },
      error: (err: any) => {
        this.errorAPI = true;
        this.errorMensaje = err;
      }
    }
    )
  }

  borrar(id: number) {
    Swal.fire({
      title: '¿Seguro que desea borrar?',
      text: `El partido ${id} será borrado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.partidosService.borrarPartido(id).subscribe({
          next: (data: any) => {
            this.cargarPartidos();
          },
          error: (err: any) => {
            this.errorMensaje = err;
          	//console.error('Ha sucedido un error al borrar');
          }

        }
        )
      }
    })    
  }

}
