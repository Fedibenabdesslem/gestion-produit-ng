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

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandeService.getMesCommandes().subscribe(data => {
      this.commandes = data;
    });
  }

  annulerCommande(id: number) {
    this.commandeService.annuler(id).subscribe(() => {
      this.commandes = this.commandes.filter(c => c.id !== id);
    });
  }
}
