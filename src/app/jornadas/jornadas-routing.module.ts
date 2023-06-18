import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'jornadas', redirectTo: 'jornadas/list', pathMatch: 'full'},  
  { path: 'jornadas/list', component: ListComponent },  
  { path: 'jornadas/form', component: FormComponent },
  { path: 'jornadas/form/:jornadaID', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JornadasRoutingModule { }
