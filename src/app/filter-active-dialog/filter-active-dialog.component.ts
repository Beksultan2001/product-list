import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DialogService } from '../dialog-service/dialog.service';
import { FilterCriteria } from '../../shared/types';

@Component({
  selector: 'filter-active-dialog',
  templateUrl: './filter-active-dialog.component.html',
  styleUrls: ['./filter-active-dialog.component.scss'],
})
export class FiterActiveDialogDialogComponent
  implements OnChanges, AfterViewInit
{
  @ViewChild('modal') modalElement!: ElementRef;
  @ViewChild('modalContent') modalContent!: ElementRef;
  @ViewChild('inputFilter') inputFilter!: ElementRef;

  @Output() valueChanged: EventEmitter<string | boolean> = new EventEmitter<
    string | boolean
  >();
  @Input() dataDialog!: { $event: Event; typeFilter: keyof FilterCriteria };

  constructor(
    private renderer: Renderer2,
    private dialogService: DialogService
  ) {}

  ngOnChanges(): void {
    this.initPosition();
  }
  ngAfterViewInit() {
    this.initPosition();
  }

  updateCriteria(key: keyof FilterCriteria, $event: Event) {
    let updatedValue;
    if (key == 'availability') {
      updatedValue = ($event.target as HTMLInputElement).checked;
    } else {
      updatedValue = ($event.target as HTMLInputElement).value;
    }
    this.valueChanged.emit(updatedValue);
  }

  resetFilter() {
    this.inputFilter.nativeElement.value = '';
    this.valueChanged.emit('');
  }

  initPosition() {
    const { $event } = this.dataDialog;
    const currentTarget = $event.currentTarget as HTMLElement;
    const rect = currentTarget.getBoundingClientRect();

    if (!this.modalElement) {
      return;
    }

    this.renderer.setStyle(
      this.modalElement.nativeElement,
      'left',
      rect.left + 'px'
    );
    this.renderer.setStyle(
      this.modalElement.nativeElement,
      'top',
      rect.top + currentTarget.offsetHeight + 'px'
    );
    this.renderer.setStyle(
      this.modalContent.nativeElement,
      'width',
      currentTarget.offsetWidth + 'px'
    );
  }

  confirmEdit() {
    this.dialogService.hideDialog();
  }

  closeDialog() {
    this.dialogService.hideDialog();
    this.resetFilter();
  }
}
