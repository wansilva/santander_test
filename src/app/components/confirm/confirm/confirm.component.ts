import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {
  @Input() title: string = 'Antenção';
  @Input() message: string = 'Tem certeza desta ação?';
  @Input() buttonConfirm: string = 'Confirmar';
  @Input() buttonCancel: string = 'Cancelar';

  @Output() confirm = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();

  confirmed(): void {
    this.confirm.emit(true);
  }

  canceled(): void {
    this.cancel.emit(false);
  }
}
