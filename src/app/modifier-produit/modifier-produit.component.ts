import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../models/produit';
import { ProduitService } from '../services/produit.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css'], 
  imports: [FormsModule]
})
export class ModifierProduitComponent implements OnInit {
  produit: Produit = {
  id: 0,
  nom: '',
  prix: 0,
  stock: 0,
  quantite: 0   
};
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.chargerProduit();
  }

  chargerProduit(): void {
    this.produitService.getProduitById(this.id).subscribe({
      next: (data) => {
        this.produit = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du produit', err);
      }
    });
  }

  modifierProduit(): void {
    this.produitService.modifierProduit(this.id, this.produit).subscribe({
      next: () => {
        alert('Produit modifié avec succès !');
        this.router.navigate(['/produits']);
      },
      error: (err) => {
        console.error('Erreur lors de la modification', err);
        alert('Échec de la modification du produit.');
      }
    });
  }

  annuler(): void {
    this.router.navigate(['/produits']);
  }
}
