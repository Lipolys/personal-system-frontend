import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent, MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormField, MatFormFieldModule, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {ViaCepService} from '../../../services/via-cep.service';
import {MatProgressBar} from '@angular/material/progress-bar';
import {NgIf} from '@angular/common';
import {AnamneseService} from '../anamnese.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {NgxMaskDirective} from 'ngx-mask';

@Component({
    selector: 'app-paciente-form',
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
    MatSelect,
    MatOption,
    MatStepperNext,
    MatProgressBar,
    NgIf,
    MatSlideToggle,
    NgxMaskDirective
  ],
    providers: [
      {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: { showError: true }
      },
      [provideNativeDateAdapter()],
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
    ],
    templateUrl: './anamnese-form.component.html',
    styleUrl: './anamnese-form.component.scss'
})
export class AnamneseFormComponent implements OnInit{

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  isLoading: boolean = false;

  private _viaCepService = inject(ViaCepService);
  private _formBuilder = inject(FormBuilder);
  private _pacienteService = inject(AnamneseService);
  private _dialogRef = inject(MatDialogRef<AnamneseFormComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: [this.data?.name || '', [Validators.required]],
      cpf: [this.data?.cpf || '', [Validators.required]],
      birthDate: [this.data?.birthDate || '', [Validators.required]],
      gender: [this.data?.gender || '', [Validators.required]],
      maritalStatus: [this.data?.maritalStatus || '', [Validators.required]],
      email: [this.data?.email || '', [Validators.required]],
      profession: [this.data?.profession || '', [Validators.required]],
      phoneNumber: [this.data?.phoneNumber || '', [Validators.required]],
      emergencyNumber: [this.data?.emergencyNumber || '', [Validators.required]],
    });
    this.secondFormGroup = this._formBuilder.group({
      cep: [this.data?.address?.cep || '', [Validators.required]],
      street: [this.data?.address?.street || '', [Validators.required]],
      neighborhood: [this.data?.address?.neighborhood || '', [Validators.required]],
      city: [this.data?.address?.city || '', [Validators.required]],
      state: [this.data?.address?.state || '', [Validators.required]],
      number: [this.data?.address?.number || ''],
      complement: [this.data?.address?.complement || ''],
    });
    this.thirdFormGroup = this._formBuilder.group({
      hasHealthPlan: [this.data?.hasHealthPlan],
      healthPlan: [this.data?.healthPlan || ''],
      enabled: [this.data?.enabled, [Validators.required]],
      valueForHour: [this.data?.valueForHour || '', [Validators.required]]
    });

    this.observePreenchimentoCep();
    this.observeHealthPlan(this.data?.healthPlan);
  }

  observeHealthPlan(healthPlan: string) {
    this.thirdFormGroup.get('hasHealthPlan')?.valueChanges.subscribe(value => {
      if(value) {
        this.thirdFormGroup.get('healthPlan')?.setValidators([Validators.required]);
        this.thirdFormGroup.get('healthPlan')?.updateValueAndValidity();
      } else {
        this.thirdFormGroup.get('healthPlan')?.clearValidators();
        this.thirdFormGroup.get('healthPlan')?.updateValueAndValidity();
      }
    });

    if(healthPlan) {
      this.thirdFormGroup.get('hasHealthPlan')?.setValue(true);
    }
  }

  observePreenchimentoCep() {
    this.secondFormGroup.get('cep')?.valueChanges.subscribe(value=> {
      if(value?.length == 8) {
        this.buscarCep();
      }
    })
  }

  buscarCep() {
    let cep = this.secondFormGroup.get('cep')?.value;
    this.isLoading = true;
    this._viaCepService.getEndereco(cep).subscribe({
      next: (response) => {
        this.secondFormGroup.patchValue({
          street: response.logradouro,
          neighborhood: response.bairro,
          city: response.localidade,
          state: response.uf
        });
        this.isLoading = false;
      },
      error: () => {
        console.log('Erro ao buscar CEP');
        this.isLoading = false;
      }
    });
  }

  incluirPaciente() {
    const address = {
      ...this.secondFormGroup.value
    }
    const paciente = {
      ...this.firstFormGroup.value,
      address,
      ...this.thirdFormGroup.value
    };

    if (this.data?.id) {
      this._pacienteService.editarPaciente(this.data.id, paciente).subscribe({
        next: () => {
          console.log('Paciente atualizado com sucesso');
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erro ao atualizar paciente', err);
        }
      });
    } else {
      this._pacienteService.incluirPaciente(paciente).subscribe({
        next: () => {
          console.log('Paciente criado com sucesso');
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.error('Erro ao criar paciente', err);
        }
      });
    }
  }
}
