import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule pour ngModel ou form
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (data) => this.users = data,
      error: (err) => this.error = 'Erreur lors du chargement des utilisateurs'
    });
  }

  onRoleChange(user: User, event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const newRole = selectElement.value;

  this.userService.updateUserRole(user.id!, newRole).subscribe(() => {
    this.loadUsers();
  });
}

  onDeleteUser(userId: string) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
