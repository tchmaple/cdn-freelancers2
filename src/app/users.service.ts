import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Freelancer } from './freelancer';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsersService implements InMemoryDbService {

  constructor(
     private http: HttpClient
  ) {}

  private BASE_URL = 'http://localhost:3000'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createDb() {
    const freelancers = [
      { id: 1, username: 'Sammy', email: 'sammy@gmail.com', phone: '0162143536', skillsets: 'photoshop', hobby: 'photography, drawing'},
      { id: 2, username: 'David Kee', email: 'davidkee@gmail.com', phone: '01734556577', skillsets: 'python, MongoDB', hobby: 'design mobile games'},
      { id: 3, username: 'Lee Ken Chee', email: 'lkc@gmail.com', phone: '0193556343', skillsets: 'designer, front end scripting', hobby: 'drawing'},
      { id: 4, username: 'Samantha Tan', email: 'samantha@gmail.com', phone: '01923674230', skillsets: 'designer, photography', hobby: 'drawing'},
      { id: 5, username: 'Maico Tan', email: 'maicoo@gmail.com', phone: '011354680576', skillsets: 'designer, photography', hobby: 'singing'},
      { id: 6, username: 'Kelly', email: 'kelly@gmail.com', phone: '01288545334', skillsets: 'accountant', hobby: 'cooking'}
 
    ];
    return {freelancers};
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      (`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllUsers (): Observable<Freelancer[]> {
    return this.http.get<Freelancer[]>(`${this.BASE_URL}/users`)
    .pipe(
      tap(_ => console.log('getAllUsers')),
      catchError(this.handleError<Freelancer[]>('getAllUsers', []))
    );
  }

  registerUser (user: Freelancer): Observable<Freelancer> {
    return this.http.post<Freelancer>(`${this.BASE_URL}/users`, JSON.stringify(user), this.httpOptions).pipe(
      tap((newFreelancer: Freelancer) => (`added user w/ id=${newFreelancer.id}`)),
      catchError(this.handleError<Freelancer>('addUser'))
    );
  }

  getSingleUser(id: number): Observable<Freelancer> {
    const url = `${this.BASE_URL}/users/${id}`;
    return this.http.get<Freelancer>(url).pipe(
      tap(_ => `fetched user id=${id}`),
      catchError(this.handleError<Freelancer>(`getSingleUser id=${id}`))
    );
  }

  deleteUser (freelancer: Freelancer | number): Observable<Freelancer> {
    const id = typeof freelancer === 'number' ? freelancer : freelancer.id;
    const url = `${this.BASE_URL}/users/${id}`;

    return this.http.delete<Freelancer>(url, this.httpOptions).pipe(
      tap(_ => (`deleted user id=${id}`)),
      catchError(this.handleError<Freelancer>('deleteUser'))
    );
  }

  updateUser(id, data): Observable<any> {
  	return this.http.patch(`${this.BASE_URL}/users/`+id, JSON.stringify(data), this.httpOptions).pipe(
      tap(_ => (`updated user id=${id}`)),
      catchError(this.handleError<any>('editUser'))
    );
  }

}