import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthServiceService } from "./auth-service.service";

@Injectable({
    providedIn: 'root'
  })
  export class DashboardService {
    url:string="http://localhost:9090/startcoding0to1/";
    private headers:HttpHeaders =new HttpHeaders();
    
    constructor(private http:HttpClient,
      private authServiceService:AuthServiceService
    ){}
    

    getUserMessage(role:string):Observable<string>{
      let token=this.authServiceService.getToken();
      this.headers=this.headers.set('Authorization',`Bearer ${token}`);
      console.log('Role: ', role)
      let res:Observable<string>=this.http.get(this.url+'for'+role,{headers:this.headers,responseType:'text'});
      res.forEach(res=>console.log(res))
      return res;
    }
    
  }