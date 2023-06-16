import { Component, OnInit } from '@angular/core';
import { EquiposService } from '../equipos.service';
import { Equipo } from '../equipo';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private equiposService: EquiposService) { }

  equipos: Equipo[] = [];
  errorAPI: boolean = false;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.cargarEquipos();
  }
  
  cargarEquipos() {
    this.equiposService.getEquipos().subscribe({
      next: (data: Equipo[]) => {
        this.equipos = data;
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
      text: `El equipo ${id} será borrado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.equiposService.borrarEquipo(id).subscribe({
          next: (data: any) => {
            this.cargarEquipos();
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
