// src/app/components/mes-commandes/mes-commandes.component.ts
import { Component, OnInit } from '@angular/core';
import { Commande, CommandeService } from '../services/commande.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-commandes',
  templateUrl: './mes-commandes.component.html',
  styleUrls: ['./mes-commandes.component.css'],
  imports: [CommonModule],
})
export class MesCommandesComponent implements OnInit {
  commandes: Commande[] = [];

  // étapes de la timeline dans l'ordre
  steps = ["EnCours", "Validée", "Expédiée", "Livrée"];

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandeService.getMesCommandes().subscribe(data => {
      // normaliser les statuts pour éviter les problèmes d'accents ou de casse
      this.commandes = data.map(c => ({
        ...c,
        statut: this.normalizeStatut(c.statut)
      }));
    });
  }

  annulerCommande(id: number) {
    this.commandeService.annuler(id).subscribe(() => {
      this.commandes = this.commandes.filter(c => c.id !== id);
    });
  }

  // Retourne un tableau des étapes actives pour une commande
  getActiveSteps(statut: string): string[] {
    const index = this.steps.indexOf(this.normalizeStatut(statut));
    if (index === -1) return [];
    return this.steps.slice(0, index + 1);
  }

  // Normalisation des statuts pour correspondre aux étapes
  normalizeStatut(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'livree':
      case 'livrée': return 'Livrée';
      case 'validée':
      case 'validee': return 'Validée';
      case 'enattente': return 'EnCours';
      case 'expediee':
      case 'expédiée': return 'Expédiée';
      default: return statut;
    }
  }
}
