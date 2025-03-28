import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  ClientesAtivosInativos,
  ClientePorMensalidade,
  ClientePorIdade,
  ClientePorSexo
} from '../../../../models/Reports';

@Component({
  selector: 'app-relatorio-clientes',
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    NgxChartsModule
  ],
  templateUrl: './relatorio-clientes.component.html',
  styleUrl: './relatorio-clientes.component.scss'
})
export class RelatorioClientesComponent implements OnInit {
  clientesAtivosInativos: any[] = [];
  clientesPorSexo: any[] = [];
  clientesPorMensalidade: any[] = [];
  clientesPorIdade: any[] = [];

  colorScheme = 'forest';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getClientesAtivosInativos().subscribe((data: ClientesAtivosInativos) => {
      this.clientesAtivosInativos = [
        { name: 'Ativos', value: data.activeClients },
        { name: 'Inativos', value: data.inactiveClients }
      ];
    });

    this.dashboardService.getClientesPorSexo().subscribe((data: ClientePorSexo) => {
      this.clientesPorSexo = [
        { name: 'Masculino', value: data.maleClients},
        { name: 'Feminino', value: data.femaleClients }
      ];
    });

    this.dashboardService.getClientesPorMensalidade().subscribe((data: ClientePorMensalidade[]) => {
      this.clientesPorMensalidade = data.map((item: ClientePorMensalidade) => ({
        name: item.subscriptionType,
        value: item.count
      }));
    });

    this.dashboardService.getClientesPorIdade().subscribe((data: ClientePorIdade[]) => {
      this.clientesPorIdade = data.map((item: ClientePorIdade) => ({
        name: item.ageRange,
        value: item.count
      }));
    });
  }
}
