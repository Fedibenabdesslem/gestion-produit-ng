import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Produit } from '../models/produit';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AjoutProduitComponent {
  produit: Produit = {
    id: 0,
    nom: '',
    prix: 0,
    stock: 0
  };

  constructor(
    private produitService: ProduitService,
    private router: Router  // Injection du Router pour la navigation
  ) {}

  ajouterProduit(): void {
    this.produitService.ajouterProduit(this.produit).subscribe({
      next: () => {
        alert('Produit ajouté avec succès !');
        // Rediriger vers la liste des produits après ajout
        this.router.navigate(['/produits']);
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout :', err);
        alert('Échec de l’ajout du produit.');
      }
    });
  }
  redirectToList(): void {
  this.router.navigate(['/produits']);
}

}
