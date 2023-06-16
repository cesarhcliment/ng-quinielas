import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'equipos', redirectTo: 'equipos/list', pathMatch: 'full'},  
  { path: 'equipos/list', component: ListComponent },  
  { path: 'equipos/form', component: FormComponent },
  { path: 'equipos/form/:equipoID', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
