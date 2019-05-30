import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Timeline from '../model/activity.model';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class TimelineService {

    BASE_URL    = environment.baseUrl;

    constructor(private http: Http, private http2: HttpClient) {

    }

    create(activity: Timeline): Observable<any> {
        return this.http2.post<Timeline>(this.BASE_URL + '/timeline/create', activity, httpOptions).pipe(
          tap((activities: Timeline[]) => console.log(`added timeline`)),
          catchError(this.handleError<Timeline>('register timeline'))
        );
    }

    getTimelineByProject(projectId): Observable<Timeline[]> {

        return this.http.get(this.BASE_URL + '/timeline/'+projectId).pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data as Timeline[];
         }));
         
    }

    addActivity(params): Observable<any> {
      return this.http2.post<Timeline>(this.BASE_URL + '/timeline/addactivity', params, httpOptions).pipe(
        tap((timeline: Timeline) => console.log(`added activity`)),
        catchError(this.handleError<Timeline>('register activity in timeline'))
      );
    }

    deleteActivity(params): Observable<any> {
      return this.http2.post<Timeline>(this.BASE_URL + '/timeline/deleteactivity', params, httpOptions).pipe(
        tap((timeline: Timeline) => console.log(`deleted activity`)),
        catchError(this.handleError<Timeline>('delete activity in timeline'))
      );
    }

    getActivitiesByFloor(projectId): Observable<any> {

      return this.http.get(this.BASE_URL + '/timeline/getactivitiesbyfloor/'+projectId).pipe(
        map(res  => {
        // Maps the response object sent from the server
        return res.json().data;
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
