import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';


import Role from '../model/role.model';
import Company from '../model/company.model';
import User from '../model/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    BASE_URL = environment.baseUrl;

    constructor(private http: Http, private auth: AuthService, private http2: HttpClient) {

    }

    getCurrentUser() {
      return this.http.get(this.BASE_URL + '/users/getuser/' + this.auth.id).pipe(map(res => res.json()));
    }

    getUser(id): Observable<User> {
      return this.http.get(this.BASE_URL + '/users/getuser/' + id).pipe(
        map(res  => {
        // Maps the response object sent from the server
        return res.json().data as User;
      }));
    }

    saveUser(userData) {
      return this.http.post(this.BASE_URL + '/users/me', userData, this.auth.tokenHeader).pipe(map(res => res.json()));
    }

    getAllUsers(): Observable<User[]> {
      return this.http.get(this.BASE_URL + '/users/getallusers').pipe(
        map(res  => {
        // Maps the response object sent from the server
        return res.json().data.docs as User[];
      }));
    }

    getRoles(): Observable<Role[]> {
      return this.http.get(this.BASE_URL + '/users/getroles').pipe(
        map(res  => {
        // Maps the response object sent from the server
        return res.json().data as Role[];
      }));
    }

    getCompanies(): Observable<Company[]> {
      return this.http.get(this.BASE_URL + '/users/getCompanies').pipe(
        map(res  => {
        // Maps the response object sent from the server
        return res.json().data as Company[];
      }));
    }

    deleteTodo(id: string): any {
      // Delete the object by the id
      const deleteUrl = `${this.BASE_URL}/users/${id}`;
      return this.http.delete(deleteUrl)
      .pipe(map(res  => {
        return res;
      }));
    }

    update(user: User): Observable<any> {
      return this.http2.put<User>(this.BASE_URL + '/users', user, httpOptions).pipe(
        tap((user: User) => console.log(`updated user w/ id=${user._id}`)),
        catchError(this.handleError<User>('updating user'))
      );
    }

    editUser(User: User) {

      console.log('IN EDIT USER SERVICE');
      const editUrl = `${this.BASE_URL}/users`;
      // returns the observable of http put request
      console.log('IN EDIT USER 2' + User.fname);
      return this.http.put(editUrl, User);
    }

    getUsersByProject(projectId): Observable<User[]> {
      return this.http.get(this.BASE_URL + '/users/getusersbyproject/'+projectId).pipe(
        map(res  => {
        // Maps the response object sent from the server
        return res.json().data as User[];
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
