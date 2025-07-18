import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit'; 

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = 'https://localhost:7241/api/produit';

  constructor(private http: HttpClient) {}

  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  ajouterProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  modifierProduit(id: number, produit: Produit): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, produit);
  }

  supprimerProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
