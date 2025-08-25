import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserService } from '../services/user.service';
import { ProduitService } from '../services/produit.service';
import { CommandeService, Commande, CommandeItem } from '../services/commande.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Produit } from '../models/produit';

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
  commandes: Commande[] = [];
  selectedCommande?: Commande; // pour voir les détails

  // Statistiques
  userRoleCounts: { name: string; value: number }[] = [];
  productQuantities: { name: string; value: number }[] = [];
  commandeStatusCounts: { name: string; value: number }[] = [];

  colorScheme: any = { domain: ['#007bff', '#00c851', '#ffbb33', '#ff4444', '#aa66cc'] };

  constructor(
    private userService: UserService,
    private produitService: ProduitService,
    private commandeService: CommandeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserStats();
    this.loadProductStats();
    this.loadCommandes();
    this.loadCommandeStats();
  }

  // 🔁 Navigation
  navigateToUsers() { this.router.navigate(['/liste des utilisateurs']); }
  navigateToProduits() { this.router.navigate(['/produits']); }
  navigateToAddProduct() { this.router.navigate(['/ajouter-produit']); }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // 📊 Statistiques utilisateurs par rôle
  private loadUserStats(): void {
    this.userService.getAll().subscribe({
      next: users => {
        this.users = users;
        const grouped = users.reduce((acc, user) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        this.userRoleCounts = Object.keys(grouped).map(role => ({ name: role, value: grouped[role] }));
      },
      error: err => console.error(err)
    });
  }

  // 📦 Statistiques produits par stock
  private loadProductStats(): void {
    this.produitService.getAllProduits().subscribe({
      next: produits => {
        this.produits = produits;
        this.productQuantities = produits.map(p => ({ name: p.nom, value: p.stock ?? 0 }));
      },
      error: err => console.error(err)
    });
  }

  // 📑 Gestion des commandes
  private loadCommandes(): void {
    this.commandeService.getAllCommandes().subscribe({
      next: cmds => this.commandes = cmds,
      error: err => console.error(err)
    });
  }

  // 📊 Commandes par statut
  private loadCommandeStats(): void {
    this.commandeService.getAllCommandes().subscribe({
      next: cmds => {
        const grouped = cmds.reduce((acc, c) => {
          acc[c.statut] = (acc[c.statut] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        this.commandeStatusCounts = Object.keys(grouped).map(st => ({ name: st, value: grouped[st] }));
      },
      error: err => console.error(err)
    });
  }

  changerStatut(id: number, statut: string) {
    this.commandeService.changerStatut(id, statut).subscribe(() => {
      const cmd = this.commandes.find(c => c.id === id);
      if (cmd) cmd.statut = statut;
      this.loadCommandeStats();
    });
  }

  annulerCommande(id: number) {
  // Pour admin, utilise PATCH avec statut "Annulee"
  this.commandeService.changerStatut(id, 'Annulee').subscribe(() => {
    const cmd = this.commandes.find(c => c.id === id);
    if (cmd) cmd.statut = 'Annulee';
    this.loadCommandeStats();
  });
}


  // 🔍 Voir détails commande
  voirDetails(cmd: Commande) {
    this.selectedCommande = cmd;
    // tu peux ouvrir un modal ou naviguer vers une page detail
    
  }
}
