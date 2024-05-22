import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthServiceService } from '../_service/auth-service.service';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  constructor(private authServiceService:AuthServiceService,
    private router:Router
  ){}

  isLoggedIn(){
    return this.authServiceService.isLoggedIn();
  }

  logOut(){
    this.authServiceService.clear();
    this.router.navigate(['/login']);
  }

}
