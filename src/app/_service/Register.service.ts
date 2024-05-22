import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";


@Injectable({
    providedIn:'root'
})
export class RegisterService{
    url:string="http://localhost:9090/startcoding0to1/";
    private headers:HttpHeaders =new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http:HttpClient
    ){}
  
    register(registerFormData:any):Observable<any>{
      console.log("Register data: "+registerFormData.value);
      return this.http.post(this.url + "auth/register", registerFormData, {headers:this.headers});
    }
}