import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';

import { HttpClient,  HttpEvent,  HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private urlEndPoint: string = 'http://localhost:8080/api/user';
  private httpheader = new HttpHeaders ({'Content-type' : 'application/json'});

  private agregaAuthorizationHeader(){
    let token = " ";
    if(token != null){
      return this.httpheader.append('Authorization' , 'Bearer' + token)
    }
    return this.httpheader;
  }

  constructor(private http: HttpClient, private router: Router) { 
    
  }

  getLlistaClients () : Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/user' , { headers: this.agregaAuthorizationHeader() });
  }
}