import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAccesoComponent } from './form-acceso.component';

describe('FormAccesoComponent', () => {
  let component: FormAccesoComponent;
  let fixture: ComponentFixture<FormAccesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAccesoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
