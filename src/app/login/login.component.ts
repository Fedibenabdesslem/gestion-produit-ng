import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  waitingApprovalMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        const token = res.token;
        localStorage.setItem('token', token);

        const decoded = this.decodeToken(token);
        const role = decoded?.role;

        if (role === 'admin') {
          this.router.navigate(['/super-admin']);
        } else if (role === 'user') {
          this.router.navigate(['/user-dashboard']);
        } else if (role === 'default') {
          this.waitingApprovalMessage = "✅ Votre compte est en attente d'approbation par l'administrateur.";
        } else {
          this.errorMessage = "❌ Rôle non reconnu.";
        }
      },
      error: (err) => {
        console.error('Erreur de login', err);
        this.errorMessage = '❌ Email ou mot de passe incorrect.';
      }
    });
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return {
        role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      };
    } catch (error) {
      return null;
    }
  }
}
