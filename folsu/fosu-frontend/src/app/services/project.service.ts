import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Project from '../model/project.model';
import ListMaterial from '../model/listmaterial.model';
import Material from '../model/material.model';
import ItemList from '../model/itemlist.model';
import { environment } from '../../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class ProjectService {

    BASE_URL    = environment.baseUrl;
    PROJECT_KEY = 'CURRENT_PROJECT';


    constructor(private http: Http, private http2: HttpClient) {

    }

    get currentProject() {
        return localStorage.getItem(this.PROJECT_KEY)
    }

    getCurrentProject() {
        return localStorage.getItem(this.PROJECT_KEY)
    }

    create(project: Project): Observable<any> {
        return this.http2.post<Project>(this.BASE_URL + '/projects/create', project, httpOptions).pipe(
          tap((project: Project) => console.log(`added project w/ id=${project._id}`)),
          catchError(this.handleError<Project>('register project'))
        );
    }

    update(project: Project): Observable<any> {
        return this.http2.put<Project>(this.BASE_URL + '/projects', project, httpOptions).pipe(
          tap((project: Project) => console.log(`updated project w/ id=${project._id}`)),
          catchError(this.handleError<Project>('updating project'))
        );
    }

    addMaterial(list: ListMaterial): Observable<any> {
        return this.http2.post<ListMaterial>(this.BASE_URL + '/listmaterials/addItem', list, httpOptions).pipe(
          tap((list: ListMaterial) => console.log(`added material`)),
          catchError(this.handleError<ListMaterial>('register material'))
        );
    }

    deleteMaterial(id: string): Observable<any> {
        
        let params = {"project":localStorage.getItem(this.PROJECT_KEY), "id":id};
        return this.http2.post<ListMaterial>(this.BASE_URL + '/listmaterials/removeItem', params, httpOptions).pipe(  
            tap((list: ListMaterial) => console.log(`removed material`)),
            catchError(this.handleError<Project>('removing material'))
        );
    }

    editItemList(item: ItemList) {

        return this.http.put(this.BASE_URL + '/listmaterials', item);

    }

    getListMaterialsByProject(projectid): Observable<ListMaterial> {

        return this.http.get(this.BASE_URL + '/listmaterials/getByProject/' + projectid).pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data as ListMaterial
         }));

    }

    getColumnsListMaterial(): string[]{
        return ["#", "Name", "Quantity"];
    }

    getColumnsListProjects(): string[]{
        return ["#", "Code", "Description", "Address"];
    }

    getProjects(): Observable<Project[]> {

        return this.http.get(this.BASE_URL + '/projects/getpopprojects').pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data as Project[];
         }));
         
    }

    getProject(projectId): Observable<Project> {

        return this.http.get(this.BASE_URL + '/projects/getproject/' + projectId).pipe(
          map(res  => {
          // Maps the response object sent from the server
           return res.json().data as Project;
         }));
         
    }

    getNumMaterials(projectid): Observable<Number> {
        return this.http.get(this.BASE_URL + '/listmaterials/getnummaterials/' + projectid).pipe(
            map(res => {
            // Maps the response object sent from the server
            return res.json().data as Number;
           }));
    }

    getMaterials(): Observable<Material[]> {
        return this.http.get(this.BASE_URL + '/materials/getAll').pipe(
            map(res  => {
            // Maps the response object sent from the server
            return res.json().data as Material[];
        }));
    }

    saveList(params): Observable<any> {
        return this.http2.post(this.BASE_URL + '/shipments/create', params, httpOptions).pipe(
            tap((res) => console.log(`added list w/ id=${res}`)),
            catchError(this.handleError('registering list'))
        );
    }

    updateList(params): Observable<any> {
        return this.http2.post(this.BASE_URL + '/shipments/update', params, httpOptions).pipe(
            tap((res) => console.log(`updated list`)),
            catchError(this.handleError('update list'))
        );
    }

    validOrder(order, type): Observable<string> {
        return this.http.get(this.BASE_URL + '/shipments/validorder/'+order+'/'+type).pipe(
            map(res  => {
            // Maps the response object sent from the server
            return res.json().data as string;
        }));
    }

    getPunchFromShipment(order): Observable<any> {
        return this.http.get(this.BASE_URL + '/shipments/generatepunch/'+order).pipe(
            map(res  => {
            // Maps the response object sent from the server
            return res.json();
        }));
    }

    getLastShipments(projectId): Observable<any> {

        return this.http.get(this.BASE_URL + '/shipments/getlastshipments/' + projectId).pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data;
         }));
         
    }

    getLastPackings(projectId): Observable<any> {

        return this.http.get(this.BASE_URL + '/shipments/getlastpackings/' + projectId).pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data;
         }));
         
    }

    getShipment(shipmentId): Observable<any> {

        return this.http.get(this.BASE_URL + '/shipments/getshipment/' + shipmentId).pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data;
         }));
         
    }

    getShipmentWithList(shipmentId): Observable<any> {

        return this.http.get(this.BASE_URL + '/shipments/getshipmentwithlist/' + shipmentId).pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data;
         }));
         
    }

    getPackingWithList(shipmentId): Observable<any> {

        return this.http.get(this.BASE_URL + '/shipments/getpackingwithlist/' + shipmentId).pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data;
         }));
         
    }

    getListMaterialById(packingId): Observable<any> {

        return this.http.get(this.BASE_URL + '/listmaterials/getlistmaterialbyid/' + packingId).pipe(
          map(res  => {
          // Maps the response object sent from the server
          return res.json().data;
         }));
         
    }

    getUsersByProject(projectId): Observable<any> {

        return this.http.get(this.BASE_URL + '/users/getusersbyproject/' + projectId).pipe(
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
