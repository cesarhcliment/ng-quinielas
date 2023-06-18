import { Component, OnInit } from '@angular/core';
import { JornadasService } from '../jornadas.service';
import { Jornada } from '../jornada';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private jornadasService: JornadasService) { }

  jornadas: Jornada[] = [];
  errorAPI: boolean = false;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.cargarJornadas();
  }
  
  cargarJornadas() {
    this.jornadasService.getJornadas().subscribe({
      next: (data: Jornada[]) => {
        this.jornadas = data;
        this.jornadas.sort( (a, b) => a.jornada - b.jornada);
        //this.jornadas.sort( (a, b) => a.fecha.localeCompare(b.fecha));
        //console.log(this.equipos);
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
      text: `La jornada ${id} será borrada`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.jornadasService.borrarJornada(id).subscribe({
          next: (data: any) => {
            this.cargarJornadas();
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
