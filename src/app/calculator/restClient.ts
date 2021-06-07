import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://127.0.0.1:5050";

  constructor(private httpClient: HttpClient) { }

  // public sendGetRequest(){
  //   this.httpClient.post(this.REST_API_SERVER,{})
  //   return this.httpClient.get(this.REST_API_SERVER);
  // }

  public sendPostRequest(op: string, num1: number, num2: number):Observable<Object>{
    let opPart = '';
    switch (op){
        case '+':
            opPart = '/add'; 
            break;
        case '-': 
            opPart = '/sub';
            break;
        case '*': 
            opPart = '/mul';
            break;
        case '/': 
            opPart = '/div';
            break;
        case '!':
            opPart = '/neg';
            break;
    }

    let url = this.REST_API_SERVER + opPart;

    const data = {"num1":num1,"num2":num2};  
    // const data = {"op":opPart, "num1":num1,"num2":num2};  
    return this.httpClient.post(url,data);
  }

}