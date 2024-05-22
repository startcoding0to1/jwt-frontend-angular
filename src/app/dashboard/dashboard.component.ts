import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_service/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  role:any;

  userMessage!:string;

  constructor(private dashService:DashboardService,
    private route:ActivatedRoute,
    private router:Router
  ){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.role=params.get('role');
    })
    this.goToDashboard();
  }
  goToDashboard(){
    this.dashService.getUserMessage(this.role).subscribe({
      next:(response:any)=>{
        this.userMessage=response;
      },
      error:(err:any)=>{
        this.userMessage="Error Encountered: "+err.error;
        if(err.status===403){
          this.router.navigate(['/forbidden']);
        }
      }
    })
  }
}
