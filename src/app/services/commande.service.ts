import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Commande {
numeroTelephone: any;
  id: number;
  userId: string;
  username: string;
  statut: string;
  dateCreation: Date;
  modePaiement: string;
  adresseLivraison: string;
  total: number;
  items: CommandeItem[];
}

export interface CommandeItem {
nomProduit: any;
  produitId: number;
  produitNom: string;
  imageUrl?: string;
  prixUnitaire: number;
  quantite: number;
  sousTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'https://localhost:7241/api/commandes';

  constructor(private http: HttpClient) {}

  // Passer commande depuis le panier (nouvelle route)
  creerDepuisPanier(dto: { adresseLivraison: string; numeroTelephone: string; modePaiement: string; }): Observable<Commande> {
  return this.http.post<Commande>(`${this.apiUrl}/from-panier`, dto);
}

  getMesCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/mes`);
  }

  annuler(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/annuler`, {});
  }

  changerStatut(id: number, statut: string): Observable<any> {
  return this.http.patch(`${this.apiUrl}/${id}/statut?value=${statut}`, {});
}

  getAllCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(`${this.apiUrl}/all`);
  }
}
