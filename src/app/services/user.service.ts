import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'https://localhost:7241/api/user';  // URL base de ton API user

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // Mettre à jour un utilisateur (ex : changer le rôle)
  updateUser(user: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${user.id}`, user);
  }

  // Supprimer un utilisateur par ID
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
