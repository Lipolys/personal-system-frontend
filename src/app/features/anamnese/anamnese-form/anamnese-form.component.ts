import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogTitle,
  MatDialogClose
} from '@angular/material/dialog';
import {
  MatStepper,
  MatStep,
  MatStepLabel,
  MatStepperNext,
  MatStepperPrevious
} from '@angular/material/stepper';
import { MatFormField, MatFormFieldModule, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NgxMaskDirective } from 'ngx-mask';
import { AnamneseService } from '../anamnese.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-anamnese-form',
  templateUrl: './anamnese-form.component.html',
  styleUrl: './anamnese-form.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatStep,
    MatFormField,
    MatFormFieldModule,
    MatStepper,
    MatInput,
    MatStepLabel,
    MatStepperPrevious,
    MatLabel,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    MatSuffix,
    MatStepperNext,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    [provideNativeDateAdapter()],
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class AnamneseFormComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  isLoading = false;
  patient!: any;

  private _formBuilder = inject(FormBuilder);
  private _anamneseService = inject(AnamneseService);
  private _dialogRef = inject(MatDialogRef<AnamneseFormComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.patient = this.data?.patient;

    this.firstFormGroup = this._formBuilder.group({
      anamnesisDate: [this.data?.anamnesisDate || new Date(), Validators.required],
      mainComplaints: [this.data?.mainComplaints || '', Validators.required],
      medicalHistory: [this.data?.medicalHistory || '']
    });

    this.secondFormGroup = this._formBuilder.group({
      observations: [this.data?.observations || ''],
      weight: [this.data?.weight || 0, Validators.required],
      height: [this.data?.height || 0, Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      waistCircumference: [this.data?.waistCircumference || 0],
      hipCircumference: [this.data?.hipCircumference || 0],
      bodyFatPercentage: [this.data?.bodyFatPercentage || 0],
      muscleMass: [this.data?.muscleMass || 0],
      bodyMassIndex: [this.data?.bodyMassIndex || 0],
      waistHipRatio: [this.data?.waistHipRatio || 0]
    });
  }

  salvarAnamnese(): void {
    const anamnese = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      patient: {
        id: this.patient.id,
        name: this.patient.name
      }
    };

    if (this.data?.id) {
      this._anamneseService.editarAnamnese(this.data.id, anamnese).subscribe({
        next: () => {
          console.log('Anamnese atualizada com sucesso');
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erro ao atualizar anamnese', err);
        }
      });
    } else {
      this._anamneseService.incluirAnamnese(anamnese).subscribe({
        next: () => {
          console.log('Anamnese criada com sucesso');
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erro ao criar anamnese', err);
        }
      });
    }
  }
}
