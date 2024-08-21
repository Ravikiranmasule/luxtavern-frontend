import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-guest-dashboard',
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.css']
})
export class GuestDashboardComponent implements OnInit {
 // Inject AuthService
   // Inject AuthService
  constructor( private router: Router ,
    private authService: AuthService ) { }

  ngOnInit(): void {
  }
  logout(): void {
    this.authService.logout(); // Clear localStorage and other logout operations
    this.router.navigate(['/login']); // Redirect to login page
  }
}
