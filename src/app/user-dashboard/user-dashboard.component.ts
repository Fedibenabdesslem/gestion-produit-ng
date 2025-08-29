import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit';
import { PanierItem } from '../models/panier-item.model';
import { ProduitService } from '../services/produit.service';
import { PanierService } from '../services/panier.service';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommandeService, Commande } from '../services/commande.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [CommonModule, FormsModule,RouterLink],
})
export class UserDashboardComponent implements OnInit {
  produits: Produit[] = [];
  produitsFiltres: Produit[] = [];
  panierItems: PanierItem[] = [];
  commandes: Commande[] = []; // 👈 pour stocker les commandes

  adresseLivraison: string = '';
  modePaiement: string = 'en ligne';
  numeroTelephone: string = '';
  message: string = '';

  constructor(
    private produitService: ProduitService,
    private panierService: PanierService,
    private commandeService: CommandeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.chargerProduits();
    this.chargerPanier();
    this.chargerCommandes(); // 👈 charger les commandes au démarrage
  }

  chargerProduits(): void {
    this.produitService.getAllProduits().subscribe({
      next: data => { this.produits = data; this.produitsFiltres = [...this.produits]; },
      error: err => console.error(err)
    });
  }

  chargerPanier(): void {
    this.panierService.getPanier().subscribe({
      next: data => this.panierItems = data,
      error: err => console.error(err)
    });
  }

  chargerCommandes(): void {
    this.commandeService.getMesCommandes().subscribe({
      next: data => this.commandes = data,
      error: err => console.error(err)
    });
  }

  ajouterAuPanier(produitId: number): void {
    this.panierService.ajouterAuPanier(produitId).subscribe({
      next: () => this.chargerPanier(),
      error: err => console.error(err)
    });
  }

  retirerDuPanier(panierItemId: number): void {
    this.panierService.retirerDuPanier(panierItemId).subscribe({
      next: () => this.chargerPanier(),
      error: err => console.error(err)
    });
  }

  viderPanier(): void {
    this.panierService.viderPanier().subscribe({
      next: () => this.chargerPanier(),
      error: err => console.error(err)
    });
  }

  getTotal(): number {
    return this.panierItems.reduce((t, i) => t + (i.produit.prix * i.quantite), 0);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  passerCommande(): void {
    if (this.panierItems.length === 0) {
      alert("Le panier est vide !");
      return;
    }

    const commandeDto = {
      adresseLivraison: this.adresseLivraison,
      numeroTelephone: this.numeroTelephone,
      modePaiement: this.modePaiement
    };

    this.commandeService.creerDepuisPanier(commandeDto).subscribe({
      next: (commande) => {
        alert(`Commande passée avec succès ! ID: ${commande.id}`);
        this.viderPanier();
        this.chargerCommandes(); // 👈 recharger la liste des commandes
        this.adresseLivraison = '';
        this.numeroTelephone = '';
        this.modePaiement = 'en ligne';
      },
      error: (err) => {
        console.error('Erreur lors de la commande', err);
        alert(err?.error?.message || 'Impossible de passer la commande.');
      }
    });
  }

  annulerCommande(id: number) {
    if (confirm("Voulez-vous vraiment annuler cette commande ?")) {
      this.commandeService.annuler(id).subscribe({
        next: () => this.chargerCommandes(),
        error: (err) => console.error(err)
      });
    }
  }
}
