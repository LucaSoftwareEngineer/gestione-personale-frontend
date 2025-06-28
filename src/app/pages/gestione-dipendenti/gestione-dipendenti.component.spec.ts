import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneDipendentiComponent } from './gestione-dipendenti.component';

describe('GestioneDipendentiComponent', () => {
  let component: GestioneDipendentiComponent;
  let fixture: ComponentFixture<GestioneDipendentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestioneDipendentiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestioneDipendentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
