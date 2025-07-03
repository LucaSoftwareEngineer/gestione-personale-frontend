import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { initFlowbite, Tooltip } from 'flowbite';

@Component({
  selector: 'app-tooltip-data-licenziamento',
  standalone: true,
  imports: [],
  templateUrl: './tooltip-data-licenziamento.component.html',
  styleUrl: './tooltip-data-licenziamento.component.css',
})
export class TooltipDataLicenziamentoComponent
  implements OnInit, AfterViewInit
{
  @Input() idEmployee = '';
  @Input() dataLicenziamento = '';

  @ViewChild('tooltipButton') tooltipButton!: ElementRef;
  @ViewChild('tooltipDiv') tooltipDiv!: ElementRef;

  target = 'tooltip-data-licenziamento-' + this.idEmployee;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.tooltipButton && this.tooltipDiv) {
      new Tooltip(
        this.tooltipDiv.nativeElement,
        this.tooltipButton.nativeElement
      );
    }
  }
}
