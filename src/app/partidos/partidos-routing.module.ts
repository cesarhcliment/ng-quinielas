import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'partidos', redirectTo: 'partidos/list', pathMatch: 'full'},  
  { path: 'partidos/list', component: ListComponent },  
  { path: 'partidos/form', component: FormComponent },
  { path: 'partidos/form/:partidoID', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartidosRoutingModule { }
