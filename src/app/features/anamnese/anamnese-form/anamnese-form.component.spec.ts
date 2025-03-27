import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamneseFormComponent } from './anamnese-form.component';

describe('PacienteFormComponent', () => {
  let component: AnamneseFormComponent;
  let fixture: ComponentFixture<AnamneseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnamneseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnamneseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
