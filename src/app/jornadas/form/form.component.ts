import { Component, OnInit } from '@angular/core';
import { JornadasService } from '../jornadas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jornada } from '../jornada';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private jornadasService: JornadasService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  formulario!: FormGroup;
  id!: number;
  swExiste: boolean = false;
  errorAPI: boolean = false;
  errorMensaje: string = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['jornadaID'];
    if (this.id) {
      this.swExiste = true;

      this.jornadasService.getJornada(this.id).subscribe(
        (data: Jornada) => {
          this.formulario.patchValue({
            jornada: data.jornada,
            fecha: data.fecha
          })
        }
      )
    }

    this.formulario = this.fb.group({
      jornada: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  get formdata() {
    return this.formulario.controls;
  }

  enviar() {
    //console.log(this.formulario.value);
    if (this.swExiste) {
      this.jornadasService.modificarJornada(this.id, this.formulario.value).subscribe({
        next: (data: any) => {
          this.router.navigateByUrl('/jornadas/list');
        },
        error: (err: any) => {
          this.errorAPI = true;
          this.errorMensaje = err;
        }
      }
      )
    } else {
      this.jornadasService.crearJornada(this.formulario.value).subscribe({
        next: (data: any) => {
          //console.log('Equipo creado');
          this.router.navigateByUrl('/jornadas/list');
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
