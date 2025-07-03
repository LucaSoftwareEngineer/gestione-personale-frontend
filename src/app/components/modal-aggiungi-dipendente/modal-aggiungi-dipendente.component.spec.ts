import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAggiungiDipendenteComponent } from './modal-aggiungi-dipendente.component';

describe('ModalAggiungiDipendenteComponent', () => {
  let component: ModalAggiungiDipendenteComponent;
  let fixture: ComponentFixture<ModalAggiungiDipendenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAggiungiDipendenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAggiungiDipendenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
