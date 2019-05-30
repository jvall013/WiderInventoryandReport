import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import User from '../model/user.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as bcryptjs from "bcryptjs";
import decode from 'jwt-decode';
import { environment } from '../../environments/environment';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class AuthService {
 
    BASE_URL   = environment.baseUrl + '/users';
    NAME_KEY   = 'name';
    ID_KEY     = '_id';
    TOKEN_KEY  = 'token';
    // store the URL so we can redirect after logging in
    redirectUrl: string;
    global;
    

    constructor(private http: Http, private http2: HttpClient, private router: Router) { }

    get name() {
        return localStorage.getItem(this.NAME_KEY);
    }

    get id() {
        return localStorage.getItem(this.ID_KEY);
    }

    get isAuthenticated() {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    get tokenHeader() {
        var header = new Headers({'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)});
        return new RequestOptions({ headers: header});
    }

    get role() {

        const token = localStorage.getItem('token');
        const tokenPayload = decode(token);

        return tokenPayload.role
    }

    isAuth(): boolean {
        if(!!localStorage.getItem(this.TOKEN_KEY)) {
            return true;
        }  
        else {
            return false;
        }
    }

    login(loginData): Observable<any> {
        var pass = loginData.password;
        delete loginData.password;
        let _thiss = this;
        
        this.http.post(this.BASE_URL + '/authenticate', loginData).subscribe(res => {
            
            if(res.json().status == "error") {
                _thiss.router.navigate(['/login/fail']);
            } else if(res.json().status == "success") {
                _thiss.global = res.json();
                bcryptjs.compare(pass, res.json().data.user.password, function(err, res) {
                    if (res == true) {
                        localStorage.setItem(_thiss.TOKEN_KEY, _thiss.global.data.token);
                        localStorage.setItem(_thiss.NAME_KEY, _thiss.global.data.user.fname);
                        localStorage.setItem(_thiss.ID_KEY, _thiss.global.data.user._id);
        
                        _thiss.router.navigate(['/']);
                    } else {
                        _thiss.router.navigate(['/login/fail']);
                    }   
                });
            } else {
                _thiss.router.navigate(['/login/fail']);
                console.error("Something really bad happend!!");
            }
        }, error => {
            _thiss.router.navigate(['/login/serverfail']);
        });

        return ;
    }

    register (user: User): Observable<any> {
        return this.http2.post<User>(this.BASE_URL + '/register', user, httpOptions).pipe(
          tap((user: User) => console.log(`added user w/ id=${user._id}`)),
          catchError(this.handleError<User>('register user'))
        );
    }

    /*async register(user) {
        
        delete user.confirmPassword;
        try {
            var response = await this.http.post(this.BASE_URL + '/register', user).toPromise();
            if(response.json().status == 'error') throw new Error(response.json()); 
        } catch (error) {
            console.error(error);
        }
        
    }

    register(user): string {
        delete user.confirmPassword;
        var response;

        this.http.post(this.BASE_URL + '/register', user).subscribe(res => {
            console.log(res);
            response = res.json();
        }, 
        (err: HttpErrorResponse) => {
            response = err;
        });

        return response;

    }*/

    logout() {

        localStorage.clear();
        sessionStorage.clear();

        /* Redirect to login page */
        this.router.navigate(['/login']);
    }

    authenticate(res) {
        var authResponse = res.json();

        if(!authResponse.data.token)
            return;

        localStorage.setItem(this.TOKEN_KEY, authResponse.data.token);
        localStorage.setItem(this.NAME_KEY, authResponse.data.user.fname);

        this.router.navigate(['/']);
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