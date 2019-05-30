import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Activity from '../model/activity.model';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ActivityService {

    BASE_URL    = environment.baseUrl;

    constructor(private http: Http, private http2: HttpClient) {

    }

    create(activity: Activity): Observable<any> {
        return this.http2.post<Activity>(this.BASE_URL + '/defaultactivities/create', activity, httpOptions).pipe(
          tap((activities: Activity[]) => console.log(`added activity`)),
          catchError(this.handleError<Activity>('register activity'))
        );
    }

    getActivities(): Observable<Activity[]> {

        return this.http.get(this.BASE_URL + '/defaultactivities/getAll').pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data as Activity[];
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
