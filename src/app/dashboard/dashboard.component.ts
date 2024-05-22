import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from '../_service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  role!: any;
  userMessage!: string;
  private routeSub!: Subscription;

  constructor(private route: ActivatedRoute, private dashService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.role = params.get('role');
      this.goToDashboard(); // Trigger the method whenever the route changes
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription to prevent memory leaks
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  goToDashboard(): void {
    this.dashService.getUserMessage(this.role).subscribe({
      next: (response: any) => {
        this.userMessage = response;
      },
      error: (err: any) => {
        this.userMessage = "Error Encountered: " + err.error;
        if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        }
      }
    });
  }
}
