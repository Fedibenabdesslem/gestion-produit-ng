import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { ProduitService } from '../services/produit.service';
import { User } from '../models/user';
import { Produit } from '../models/produit';
import { NgxChartsModule, Color } from '@swimlane/ngx-charts';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgxChartsModule]
})
export class SuperAdminDashboardComponent implements OnInit {
  users: User[] = [];
  produits: Produit[] = [];
  userRoleCounts: { name: string; value: number }[] = [];
  productQuantities: { name: string; value: number }[] = [];

  colorScheme: any = {
    domain: ['#007bff', '#00c851', '#ffbb33', '#ff4444', '#aa66cc']
  };

  constructor(
    private userService: UserService,
    private produitService: ProduitService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserStats();
    this.loadProductStats();
  }

  // 🔁 Redirections
  navigateToUsers() {
    this.router.navigate(['/liste des utilisateurs']);
  }

  navigateToProduits() {
    this.router.navigate(['/produits']);
  }

  navigateToAddProduct() {
    this.router.navigate(['/ajouter-produit']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // 📊 Statistiques utilisateurs par rôle
  private loadUserStats(): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
        const grouped = users.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        this.userRoleCounts = Object.keys(grouped).map(role => ({
          name: role,
          value: grouped[role]
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
      }
    });
  }

  // 📦 Statistiques produits par quantité
  private loadProductStats(): void {
    this.produitService.getAllProduits().subscribe({
      next: (produits) => {
        this.produits = produits;
        this.productQuantities = produits.map(p => ({
          name: p.nom,
          value: p.stock ?? 0
        }));
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits', err);
      }
    });
  }
}
