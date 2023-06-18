import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Jornada } from './jornada';

@Injectable({
  providedIn: 'root'
})
export class JornadasService {

  constructor(private httpClient: HttpClient) { }

  private APIurl = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
  
  getJornadas(): Observable<Jornada[]> {
    return this.httpClient.get<Jornada[]>(this.APIurl+'/jornadas/list')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getJornada(id: number): Observable<Jornada> {
    return this.httpClient.get<Jornada>(this.APIurl+'/jornadas/list/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  crearJornada(jornada: any): Observable<Jornada> {
    return this.httpClient.post<Jornada>(this.APIurl+'/jornadas/new', JSON.stringify(jornada), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  modificarJornada(id: number, jornada: any): Observable<Jornada> {
    return this.httpClient.put<Jornada>(this.APIurl+'/jornadas/update/' + id, JSON.stringify(jornada), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  borrarJornada(id: number): Observable<Jornada> {
    return this.httpClient.delete<Jornada>(this.APIurl+'/jornadas/delete/'+id)
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
