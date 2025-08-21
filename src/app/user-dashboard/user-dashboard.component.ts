import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit';
import { PanierItem } from '../models/panier-item.model';
import { ProduitService } from '../services/produit.service';
import { PanierService } from '../services/panier.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [CommonModule],
})
export class UserDashboardComponent implements OnInit {
  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];
  panierItems: PanierItem[] = [];
  message: string = '';
  showNotification: boolean = false;

  constructor(
    private produitService: ProduitService,
    private panierService: PanierService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
    this.chargerPanier();
  }

  chargerProduits(): void {
    this.produitService.getAllProduits().subscribe({
      next: data => {
        this.produits = data;
        this.produitsFiltres = [...this.produits]; // Initialiser le filtre
      },
      error: err => console.error(err)
    });
  }

  chargerPanier(): void {
    this.panierService.getPanier().subscribe({
      next: data => this.panierItems = data,
      error: err => console.error(err)
    });
  }

  ajouterAuPanier(produitId: number): void {
    this.panierService.ajouterAuPanier(produitId).subscribe({
      next: item => {
        this.showNotification = true;
        this.chargerPanier();
        setTimeout(() => this.showNotification = false, 2000);
      },
      error: err => console.error('Erreur ajout panier', err)
    });
  }

  retirerDuPanier(panierItemId: number): void {
    this.panierService.retirerDuPanier(panierItemId).subscribe({
      next: () => this.chargerPanier(),
      error: err => console.error('Erreur retrait panier', err)
    });
  }

  viderPanier(): void {
    this.panierService.viderPanier().subscribe({
      next: () => this.chargerPanier(),
      error: err => console.error(err)
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getTotal(): number {
    return this.panierItems.reduce((total, item) => total + (item.produit.prix * item.quantite), 0);
  }



}
