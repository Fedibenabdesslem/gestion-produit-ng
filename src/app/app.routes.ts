import { Routes } from '@angular/router';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';

export const routes: Routes = [
     { path: '', redirectTo: 'produits', pathMatch: 'full' },
  { path: 'produits', component: ProduitListComponent},
  {path: 'ajouter-produit', component: AjoutProduitComponent},
  {path: 'modifier-produit/:id', component: ModifierProduitComponent}
];
