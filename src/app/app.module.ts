import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { EquiposModule } from './equipos/equipos.module';
import { NavbarComponent } from './navbar/navbar.component';
import { JornadasModule } from './jornadas/jornadas.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EquiposModule,
    JornadasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
