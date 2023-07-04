import { Component, OnInit } from '@angular/core';
import { PartidosService } from '../partidos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Partido } from '../partido';
import { JornadasService } from 'src/app/jornadas/jornadas.service';
import { Jornada } from 'src/app/jornadas/jornada';
import { EquiposService } from 'src/app/equipos/equipos.service';
import { Equipo } from 'src/app/equipos/equipo';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private partidosService: PartidosService,
    private jornadasService: JornadasService,
    private equiposService: EquiposService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  formulario!: FormGroup;
  id!: number;
  swExiste: boolean = false;
  errorAPI: boolean = false;
  errorMensaje: string = '';
  jornadas: Jornada[] = [];
  equipos: Equipo[] = [];
  fecha: string = '';

  ngOnInit(): void {
    // Cargar todas las jornadas para el select
    this.jornadasService.getJornadas().subscribe(
      {
        next: (data: Jornada[]) => {
          this.jornadas = data;
        },
        error: (err: any) => {
          this.errorAPI = true;
          this.errorMensaje = err;
        }
      }
    )

    // Cargar todos los equipos para el select (local y visitante)
    this.equiposService.getEquipos().subscribe(
      {
        next: (data: Equipo[]) => {
          this.equipos = data;
        },
        error: (err: any) => {
          this.errorAPI = true;
          this.errorMensaje = err;
        }
      }
    )

    this.id = this.route.snapshot.params['partidoID'];
    if (this.id) {
      this.swExiste = true;

      this.partidosService.getPartido(this.id).subscribe(
        (data: Partido) => {
          this.formulario.patchValue({
            jornada: data.jornada,
            fecha: data.fecha,
            orden: data.orden,
            idlocal: data.idlocal,
            idvisitante: data.idvisitante,
            goleslocal: data.goleslocal,
            golesvisitante: data.golesvisitante
          })
        }
      )
    }

    this.formulario = this.fb.group({
      jornada: ['', Validators.required],
      fecha: ['', Validators.required],
      orden: ['1', Validators.required],
      idlocal: ['', Validators.required],
      idvisitante: ['', Validators.required],
      goleslocal: ['0', Validators.required],
      golesvisitante: ['0', Validators.required],
    });
  }

  get formdata() {
    return this.formulario.controls;
  }

  onChangeJornada(event: Event) {
    const data = (event.target as HTMLSelectElement).selectedOptions[0].label;
    const fechaSt = data.substr(6,4) + "-" + data.substr(3,2) + "-" + data.substr(0,2);
    this.formulario.patchValue({
      fecha: fechaSt
    })
  }

  enviar() {
    //console.log(this.formulario.value);
    if (this.swExiste) {
      this.partidosService.modificarPartido(this.id, this.formulario.value).subscribe({
        next: (data: any) => {
          this.router.navigateByUrl('/partidos/list');
        },
        error: (err: any) => {
          this.errorAPI = true;
          this.errorMensaje = err;
        }
      }
      )
    } else {
      this.partidosService.crearPartido(this.formulario.value).subscribe({
        next: (data: any) => {
          //console.log('Equipo creado');
          this.router.navigateByUrl('/partidos/list');
        },
        error: (err: any) => {
          this.errorAPI = true;
          this.errorMensaje = err;
        }
      }
      )
    }
  }

}
