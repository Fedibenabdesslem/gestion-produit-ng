import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit';
import { ProduitService } from '../../services/produit.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css'],
  imports: [CommonModule] // Assurez-vous d'importer les modules nécessaires si vous utilisez des directives Angular
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];

  constructor(private produitService: ProduitService, private router: Router) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  // Charger tous les produits depuis le backend
  chargerProduits(): void {
    this.produitService.getAllProduits().subscribe({
      next: (data: Produit[]) => {
        this.produits = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits', err);
      }
    });
  }

  // Supprimer un produit
  supprimerProduit(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.produitService.supprimerProduit(id).subscribe({
        next: () => {
          this.chargerProduits(); // Recharger la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
        }
      });
    }
  }

  // Rediriger vers le formulaire de modification
  modifierProduit(id: number): void {
    this.router.navigate(['/modifier-produit', id]);
    console.log(`Modifier le produit avec l'ID: ${id}`);
  }
}
