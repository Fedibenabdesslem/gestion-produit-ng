import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class SuperAdminDashboardComponent {
  constructor(private router: Router) {}

  navigateToUsers() {
    this.router.navigate(['/liste des utilisateurs']); 
  }

  navigateToProduits() {
    this.router.navigate(['/produits']);
  }
}
