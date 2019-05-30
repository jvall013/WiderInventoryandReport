import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ReportService {

    BASE_URL = environment.baseUrl;

    constructor(private http: Http, private http2: HttpClient) {

    }

    getDeliveredMaterials(projectId): Observable<any> {
        return this.http.get(this.BASE_URL + '/reports/getDelivered/'+projectId).pipe(
            map(res  => {
            // Maps the response object sent from the server
            return res.json().data;
        }));
    }

    getDiffWithPlannedList(projectId): Observable<any> {
        return this.http.get(this.BASE_URL + '/reports/getdiffwithplanned/'+projectId).pipe(
            map(res  => {
            // Maps the response object sent from the server
            return res.json().data;
        }));
    }

}