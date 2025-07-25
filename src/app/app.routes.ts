import { Routes } from '@angular/router';
import { ProduitListComponent } from './components/produit-list/produit-list.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';
import { LoginComponent } from './login/login.component';

import { AdminGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produits', component: ProduitListComponent},
  {path: 'ajouter-produit', component: AjoutProduitComponent},
  {path: 'modifier-produit/:id', component: ModifierProduitComponent},
  {path:'login',component:LoginComponent},
  {path:'liste des utilisateurs',component:AdminDashboardComponent},
  { path: 'liste des utilisateurs', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'super-admin', component: SuperAdminDashboardComponent, canActivate: [AdminGuard] },

   { path: '**', redirectTo: '' }
  

];
