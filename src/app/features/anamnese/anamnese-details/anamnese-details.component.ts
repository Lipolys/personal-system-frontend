import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-anamnese-details',
  imports: [
    MatButton,
    DatePipe,
    MatDialogClose
  ],
  templateUrl: './anamnese-details.component.html',
  styleUrl: './anamnese-details.component.scss'
})
export class AnamneseDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<AnamneseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
