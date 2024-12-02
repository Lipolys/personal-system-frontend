import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-paciente-details',
  imports: [
    MatButton,
    DatePipe,
    MatDialogClose
  ],
  templateUrl: './paciente-details.component.html',
  styleUrl: './paciente-details.component.scss'
})
export class PacienteDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<PacienteDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}