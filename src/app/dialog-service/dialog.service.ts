import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public showDialogSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor() {}

  showDialog(): void {
    this.showDialogSubject.next(true);
  }

  hideDialog(): void {
    this.showDialogSubject.next(false);
  }
}
