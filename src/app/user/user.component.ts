import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../_service/auth-service.service';
import { Router } from '@angular/router';
import { RegisterService } from '../_service/Register.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // registerForm:any;
  // userName!:string;
  // firstName!:string;
  // lastName!:string;
  // userPassword!:string;

  constructor(private registerService:RegisterService,
    private authService:AuthServiceService,
    private router:Router
  ){}

  register(registerForm:NgForm){
    this.registerService.register(registerForm.value).subscribe({
      next:(response:any)=>{
        console.log(response)
        console.log("Roles: ",response.user.authorities);
        console.log("JWT Token: ",response.access_token)
        this.authService.setRoles(response.user.authorities);
        this.authService.setToken(response.access_token);
        const role=response.user.authorities[0];        
        this.router.navigate(['dashboard',role.authority.slice(5)]);
      },
      error:(err:any)=>{
        console.log("Error: ",err)
      }
    });
  }
}
