import { ModalComponent } from 'src/app/components/modal/modal.component';

export class ModalService {
  constructor() {}

  static open(obj: any) {
    new ModalComponent().open(obj);
  }
}
