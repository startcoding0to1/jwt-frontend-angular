import { Component } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../_service/auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:any;
  userName!:string;
  userPassword!:string;

  constructor(private loginService:LoginService,
    private authService:AuthServiceService,
    private router:Router
  ){}

  login(loginForm:NgForm){
    this.loginService.login(loginForm.value).subscribe({
      next:(response:any)=>{
        console.log(response)
        console.log("Roles: ",response.user.authorities);
        console.log("JWT Token: ",response.access_token)
        this.authService.setRoles(response.user.authorities);
        this.authService.setToken(response.access_token);
        const role=response.user.authorities[0];        
        this.router.navigate(['dashBoard',role.authority.slice(5)]);
      },
      error:(err:any)=>{
        console.log("Error: ",err)
      }
    });
  }
}
