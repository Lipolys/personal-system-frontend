import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgxChartsModule } from '@swimlane/ngx-charts';

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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getClientesAtivosInativos().subscribe(data => {
      this.clientesAtivosInativos = data;
    });

    this.dashboardService.getClientesPorSexo().subscribe(data => {
      this.clientesPorSexo = data;
    });

    this.dashboardService.getClientesPorMensalidade().subscribe(data => {
      this.clientesPorMensalidade = data;
    });

    this.dashboardService.getClientesPorIdade().subscribe(data => {
      this.clientesPorIdade = data;
    });
  }
}
