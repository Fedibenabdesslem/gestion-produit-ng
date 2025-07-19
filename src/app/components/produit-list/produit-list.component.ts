import { Component, OnInit } from '@angular/core';
import { Produit } from '../../models/produit';
import { ProduitService } from '../../services/produit.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-produit-list',
  templateUrl: './produit-list.component.html',
  styleUrls: ['./produit-list.component.css'],
  imports: [CommonModule,RouterLink]
})
export class ProduitListComponent implements OnInit {
  produits: Produit[] = [];

  constructor(private produitService: ProduitService, private router: Router) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.produitService.getAllProduits().subscribe(data => {
      this.produits = data;
    });
  }

  supprimerProduit(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.produitService.supprimerProduit(id).subscribe(() => {
        this.chargerProduits(); 
      });
    }
  }

  modifierProduit(id: number): void {
    this.router.navigate(['/modifier-produit', id]);
   
    console.log(`Modifier le produit avec l'ID: ${id}`);
  }

}
