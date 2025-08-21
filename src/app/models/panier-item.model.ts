import { Produit } from './produit';

export interface PanierItem {
  id: number;
  quantite: number;
  produitId: number;
  userId: string;
  username: string;
  produit: Produit;
}
