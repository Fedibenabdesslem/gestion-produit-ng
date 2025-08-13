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

  ajouterProduit(produit: Produit, imageFile?: File): Observable<Produit> {
    const formData = new FormData();
    formData.append('nom', produit.nom);
    formData.append('prix', produit.prix.toString());
    formData.append('stock', produit.stock.toString());
    formData.append('description', produit.description || '');
    
    if (imageFile) {
      formData.append('imageFile', imageFile, imageFile.name);
    }

    return this.http.post<Produit>(this.apiUrl, formData);
  }
   

  modifierProduitFormData(id: number, formData: FormData): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}`, formData);
}

  modifierProduit(id: number, produit: Produit, imageFile?: File): Observable<void> {
    const formData = new FormData();
    formData.append('nom', produit.nom);
    formData.append('prix', produit.prix.toString());
    formData.append('stock', produit.stock.toString());
    formData.append('description', produit.description || '');
    
    if (imageFile) {
      formData.append('imageFile', imageFile, imageFile.name);
    }

    return this.http.put<void>(`${this.apiUrl}/${id}`, formData);
  }

  supprimerProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
