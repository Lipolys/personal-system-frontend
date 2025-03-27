import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-relatorio-aniversariantes',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './relatorio-aniversariantes.component.html',
  styleUrl: './relatorio-aniversariantes.component.scss'
})
export class RelatorioAniversariantesComponent implements OnInit {
  aniversariantes: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // this.dashboardService.getAniversariantes().subscribe(data => {
    //   this.aniversariantes = data;
    // });
  }
}
