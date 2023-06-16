import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Equipo } from './equipo';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  constructor(private httpClient: HttpClient) { }

  private APIurl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  
  getEquipos(): Observable<Equipo[]> {
    return this.httpClient.get<Equipo[]>(this.APIurl+'/equipos/list')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getEquipo(id: number): Observable<Equipo> {
    return this.httpClient.get<Equipo>(this.APIurl+'/equipos/list/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  crearEquipo(equipo: any): Observable<Equipo> {
    return this.httpClient.post<Equipo>(this.APIurl+'/equipos/new', JSON.stringify(equipo), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  modificarEquipo(id: number, equipo: any): Observable<Equipo> {
    return this.httpClient.put<Equipo>(this.APIurl+'/equipos/update/' + id, JSON.stringify(equipo), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  borrarEquipo(id: number): Observable<Equipo> {
    return this.httpClient.delete<Equipo>(this.APIurl+'/equipos/delete/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // error en el cliente
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      errorMessage = 'Ha habido un error de conexión con la API';
    } else if (error.status === 400 || error.status === 404) {
      errorMessage = error.error.mensaje;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }  

}
