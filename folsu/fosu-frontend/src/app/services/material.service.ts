import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Material from '../model/material.model';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class MaterialService {

    BASE_URL    = environment.baseUrl;

    constructor(private http: Http, private http2: HttpClient) {

    }

    create(material: Material): Observable<any> {
        return this.http2.post<Material>(this.BASE_URL + '/materials/create', material, httpOptions).pipe(
          tap((materials: Material[]) => console.log(`added material`)),
          catchError(this.handleError<Material>('register material'))
        );
    }

    getMaterials(): Observable<Material[]> {

        return this.http.get(this.BASE_URL + '/materials/getAll').pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data as Material[];
         }));
         
    }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
}

}
