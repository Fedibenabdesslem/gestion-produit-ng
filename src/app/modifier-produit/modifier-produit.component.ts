import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../models/produit';
import { ProduitService } from '../services/produit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ModifierProduitComponent implements OnInit {
  produit: Produit = {
    id: 0,
    nom: '',
    prix: 0,
    stock: 0,
    description: '',
    imageUrl: ''
  };
  id!: number;
  selectedFile: File | null = null;

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
      next: (data) => this.produit = data,
      error: (err) => console.error('Erreur lors du chargement du produit', err)
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  modifierProduit(): void {
    const formData = new FormData();
    formData.append('id', this.produit.id.toString());
    formData.append('nom', this.produit.nom);
    formData.append('prix', this.produit.prix.toString());
    formData.append('stock', this.produit.stock.toString());
    formData.append('description', this.produit.description);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.produitService.modifierProduitFormData(this.id, formData).subscribe({
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
