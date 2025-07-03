import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipDataLicenziamentoComponent } from './tooltip-data-licenziamento.component';

describe('TooltipDataLicenziamentoComponent', () => {
  let component: TooltipDataLicenziamentoComponent;
  let fixture: ComponentFixture<TooltipDataLicenziamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipDataLicenziamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TooltipDataLicenziamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
