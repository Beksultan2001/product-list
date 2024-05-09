import { Component, HostListener } from '@angular/core';
import { DataService } from './data-service/data.service';
import { FilterCriteria, TableColumn } from '../shared/types';
import initData from '../assets/data.json';
import { DialogService } from './dialog-service/dialog.service';
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHorizontalScroll]',
})
export class HorizontalScrollDirective {
  private scrolledHorizontally: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private dialogService: DialogService
  ) {}

  @HostListener('scroll', ['$event'])
  onTableScroll(event: Event) {
    const table = event.target as HTMLElement;
    const scrolled = table.scrollLeft > 0;
    this.dialogService.hideDialog();
    if (scrolled !== this.scrolledHorizontally) {
      this.scrolledHorizontally = scrolled;
      if (scrolled) {
        this.renderer.addClass(this.el.nativeElement, 'scrolled');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'scrolled');
      }
    }
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService],
})
export class AppComponent {
  title = 'custom-table';
  scrolledHorizontally: boolean = false;
  tableData: FilterCriteria[] = initData;

  tableHeaders: TableColumn[] = [
    { label: 'Бренд', width: '350px', field: 'brand' },
    { label: 'Артикул', width: '550px', field: 'article' },
    { label: 'Наименование товара', width: '609px', field: 'productName' },
    { label: 'Цена', width: '650px', field: 'price' },
    { label: 'Наличие', width: '270px', field: 'availability' },
  ];

  criteria: FilterCriteria = {
    brand: '',
    article: '',
    productName: '',
    price: '',
    availability: null,
  };

  isDialogVisible: boolean = false;
  dataDialog!: { $event: Event; typeFilter: keyof FilterCriteria };

  constructor(
    private dataService: DataService,
    private dialogService: DialogService
  ) {
    this.dialogService.showDialogSubject.subscribe((bool) => {
      this.isDialogVisible = bool;
    });
  }

  showEditDialog($event: Event, typeFilter: keyof FilterCriteria) {
    this.dataDialog = { $event, typeFilter };
    this.dialogService.showDialog();
  }

  applyFilters() {
    this.tableData = this.dataService.filterData(initData, this.criteria);
  }

  updateCriteria(key: keyof FilterCriteria, updatedValue: boolean | string) {
    this.criteria = { ...this.criteria, [key]: updatedValue };
    this.applyFilters();
  }

  updateDropdown(availability: boolean) {
    this.criteria.availability = availability;
    this.applyFilters();
  }
}
