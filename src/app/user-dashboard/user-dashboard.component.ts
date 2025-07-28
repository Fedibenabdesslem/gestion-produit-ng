import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit';
import { NgxChartsModule, Color } from '@swimlane/ngx-charts';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NgxChartsModule]
})
export class UserDashboardComponent implements OnInit {
  produits: Produit[] = [];
  productQuantities: any[] = [];
  productValues: any[] = [];

  colorScheme: string | Color = 'vivid';

  constructor(
    private produitService: ProduitService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProductStats();
  }

  // 🔄 Récupération et transformation des données
  loadProductStats(): void {
    this.produitService.getAllProduits().subscribe({
      next: (produits) => {
        this.produits = produits;

        // Quantité par produit
        this.productQuantities = produits.map(p => ({
          name: p.nom,
          value: p.stock // ou p.quantite selon votre backend
        }));

        // Valeur totale par produit (prix * stock)
        this.productValues = produits.map(p => ({
          name: p.nom,
          value: p.stock * p.prix
        }));
      },
      error: (err) => {
        console.error('Erreur de chargement des produits', err);
      }
    });
  }

  // 🔁 Navigation vers la liste des produits
  navigateToProduits(): void {
    this.router.navigate(['/produits']);
  }
  

  navigateToAddProduct() {
    this.router.navigate(['/ajouter-produit']);
  }
    // 🔒 Déconnexion
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
