import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string="http://localhost:9090/startcoding0to1/";
  private headers:HttpHeaders =new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient,
    private authService:AuthServiceService
  ){}

  login(loginFormData:any):Observable<any>{
    console.log("Login data: "+loginFormData.value);
    return this.http.post(this.url + "auth/authenticate", loginFormData, {headers:this.headers});
  }

  
  public roleMatch(allowedRoles:string[]):boolean{
    let isMatch=false;
    const userRoles:any=this.authService.getRoles();
    if(userRoles != null && userRoles){
      for(let i=0;i<userRoles.length;i++){
        for(let j=0;j<allowedRoles.length;j++){
          if(userRoles[i].authority.slice(5)===allowedRoles[j]){
            isMatch=true;
            return isMatch;
          }
        }
      }  
    }
    return isMatch;
  }
}
