import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Partido, PartidoLista } from './partido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {

  constructor(private httpClient: HttpClient) { }

  private APIurl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  
  getPartidos(): Observable<PartidoLista[]> {
    return this.httpClient.get<PartidoLista[]>(this.APIurl+'/partidos/list')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getPartido(id: number): Observable<Partido> {
    return this.httpClient.get<Partido>(this.APIurl+'/partidos/list/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  crearPartido(partido: any): Observable<Partido> {
    return this.httpClient.post<Partido>(this.APIurl+'/partidos/new', JSON.stringify(partido), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  modificarPartido(id: number, partido: any): Observable<Partido> {
    return this.httpClient.put<Partido>(this.APIurl+'/partidos/update/' + id, JSON.stringify(partido), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  borrarPartido(id: number): Observable<Partido> {
    return this.httpClient.delete<Partido>(this.APIurl+'/partidos/delete/'+id)
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
    if (!errorMessage) {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }  

}
