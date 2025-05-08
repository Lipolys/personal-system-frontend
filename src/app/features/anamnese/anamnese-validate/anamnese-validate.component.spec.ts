import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnamneseValidateComponent } from './anamnese-validate.component';

describe('AnamneseValidateComponent', () => {
  let component: AnamneseValidateComponent;
  let fixture: ComponentFixture<AnamneseValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnamneseValidateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnamneseValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
