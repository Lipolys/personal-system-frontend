import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-relatorio-anamnese',
  imports: [
    CommonModule,
    MatCardModule,
    NgxChartsModule
  ],
  templateUrl: './relatorio-anamnese.component.html',
  styleUrl: './relatorio-anamnese.component.scss'
})
export class RelatorioAnamneseComponent implements OnInit {
  clientesComSemAnamnese: any[] = [];
  crescimentoClientesAnamnese: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getClientesComSemAnamnese().subscribe(data => {
      this.clientesComSemAnamnese = data;
    });

    this.dashboardService.getCrescimentoClientesAnamnese().subscribe(data => {
      this.crescimentoClientesAnamnese = data;
    });
  }
}
