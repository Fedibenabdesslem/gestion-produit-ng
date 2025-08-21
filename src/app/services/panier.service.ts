import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PanierItem } from '../models/panier-item.model';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private apiUrl = 'https://localhost:7241/api/Panier';

  constructor(private http: HttpClient) {}

  getPanier(): Observable<PanierItem[]> {
    return this.http.get<PanierItem[]>(`${this.apiUrl}/liste`);
  }

  ajouterAuPanier(produitId: number, quantite: number = 1): Observable<PanierItem> {
    return this.http.post<PanierItem>(`${this.apiUrl}/ajouter?produitId=${produitId}&quantite=${quantite}`, {});
    alert('Produit ajouté au panier');  
  }

  retirerDuPanier(panierItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${panierItemId}`);
  }

  viderPanier(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/vider`);
  }
}
