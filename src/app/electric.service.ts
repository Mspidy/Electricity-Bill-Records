import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectricService {

  constructor(private http: HttpClient) { }

  addUser(body){

    const customHeaders = new HttpHeaders({
      'authenticationKey': 'testing2323'
    });

    return this.http.post('http://localhost:8000/electricBills', body, {headers: customHeaders})
  }
}
