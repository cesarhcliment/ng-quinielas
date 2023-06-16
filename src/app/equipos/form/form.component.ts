import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquiposService } from '../equipos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from '../equipo';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
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

  ngOnInit(): void {
    this.id = this.route.snapshot.params['equipoID'];
    if (this.id) {
      this.swExiste = true;

      this.equiposService.getEquipo(this.id).subscribe(
        (data: Equipo) => {
          this.formulario.patchValue({
            nombre: data.nombre
          })
        }
      )
    }

    this.formulario = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  get formdata() {
    return this.formulario.controls;
  }

  enviar() {
    //console.log(this.formulario.value);
    if (this.swExiste) {
      this.equiposService.modificarEquipo(this.id, this.formulario.value).subscribe({
        next: (data: any) => {
          this.router.navigateByUrl('/equipos/list');
        },
        error: (err: any) => {
          this.errorAPI = true;
          this.errorMensaje = err;
        }
      }
      )
    } else {
      this.equiposService.crearEquipo(this.formulario.value).subscribe({
        next: (data: any) => {
          //console.log('Equipo creado');
          this.router.navigateByUrl('/equipos/list');
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
