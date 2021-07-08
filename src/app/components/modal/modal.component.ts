import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  modalTitle: string = 'modal title';
  modalBody: string = 'modal body';
  btnCloseTitle: string = 'modal btn close';
  btnSaveTitle: string = 'modal btn save';

  constructor() {}

  ngOnInit(): void {}

  open(obj: any) {
    this.modalTitle = obj.title;
    console.log('open from component...', this.modalTitle);
  }
}
