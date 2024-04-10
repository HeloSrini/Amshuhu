import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly url = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  getData(): Observable<any> 
  {
    return this.http.get<any>(`${this.url}/handleGet`).pipe(
      catchError(this.handleError)
    );
  }

  InsertData(data: any): Observable<any>
  {
    return this.http.post<any>(`${this.url}/handlePost`, data).pipe(catchError(this.handleError)
    );
  }

  updateStatus(toggle:any)
  {
    return this.http.put<any>(`${this.url}/handlePut`,toggle).pipe(
      catchError(this.handleError)
    );
  }

  editData(id: number, data: any): Observable<any> 
  {
    return this.http.put<any>(`${this.url}/handlePut/${id}`,data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> 
  {
    console.error("An error occurred: ", error);
    throw Error;
  }
} 
