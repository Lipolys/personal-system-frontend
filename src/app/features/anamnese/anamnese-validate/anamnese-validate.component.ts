import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AnamneseService} from '../anamnese.service';
import {MatButton } from '@angular/material/button';
import {NgClass, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-anamnese-validate',
  templateUrl: './anamnese-validate.component.html',
  imports: [
    MatButton,
    NgIf,
    NgClass,
    MatIcon
  ],
  styleUrls: ['./anamnese-validate.component.scss']
})
export class AnamneseValidateComponent {
  responseMessage: string = '';
  showFileButton: boolean = true;
  responseIcon: string = '';

  constructor(
    public dialogRef: MatDialogRef<AnamneseValidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private anamneseService: AnamneseService
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('file', file);

      this.anamneseService.validarAnamnese(formData).subscribe((response: string) => {
        this.responseMessage = response.toString();
        this.showFileButton = false;
        this.responseIcon = response === 'Documento assinado válido' ? 'check_circle' : 'error';
      });
    }
  }
}
