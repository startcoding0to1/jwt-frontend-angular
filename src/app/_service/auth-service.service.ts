import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  public setRoles(roles:[]):void{
    localStorage.setItem("roles",JSON.stringify(roles));
  }

  public getRoles():[]{
    let str=localStorage.getItem("roles")
    return str?JSON.parse(str):[];
  }

  public setToken(jwtToken:string):void{
    localStorage.setItem("jwtToken",jwtToken)
  }

  public getToken():string | null{
    let token=localStorage.getItem("jwtToken")
    return token;
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn():boolean{
    return this.getRoles() && this.getToken()?true:false;
  }

}
