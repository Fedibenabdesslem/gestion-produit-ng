import { Routes } from '@angular/router';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './guards/auth.guard';

export const routes: Routes = [
     
  { path: 'produits', component: ProduitListComponent},
  {path: 'ajouter-produit', component: AjoutProduitComponent},
  {path: 'modifier-produit/:id', component: ModifierProduitComponent},
  {path:'login',component:LoginComponent},
  {path:'Admin',component:AdminDashboardComponent},
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
   { path: '**', redirectTo: 'login' }
  

];
