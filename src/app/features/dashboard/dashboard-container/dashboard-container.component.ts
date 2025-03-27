import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { RelatorioAnamneseComponent } from '../components/relatorio-anamnese/relatorio-anamnese.component';
import { RelatorioAniversariantesComponent } from '../components/relatorio-aniversariantes/relatorio-aniversariantes.component';
import { RelatorioAtivosComponent } from '../components/relatorio-ativos/relatorio-ativos.component';
import { RelatorioClientesComponent } from '../components/relatorio-clientes/relatorio-clientes.component';

@Component({
  selector: 'app-dashboard-container',
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    RelatorioAnamneseComponent,
    RelatorioAniversariantesComponent,
    RelatorioAtivosComponent,
    RelatorioClientesComponent
  ],
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss'
})
export class DashboardContainerComponent {
  tabs = ['Clientes', 'Aniversariantes', 'Anamnese', 'Ativos'];
}
