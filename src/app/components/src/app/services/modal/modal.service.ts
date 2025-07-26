import { Injectable } from '@angular/core';
import {
  NgbModal,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal) {}
  openModal(
    content: any,
    backdropClose: boolean = true,
    backdrop: 'static' | true | false = true,
    keyboard: boolean = true,
    size: 'sm' | 'lg' | 'xl' = 'lg'
  ): NgbModalRef {
    const options: NgbModalOptions = {
      backdrop: backdropClose ? backdrop : 'static',
      keyboard: keyboard,
      size: size,
      centered: true,
    };

    return this.modalService.open(content, options);
  }
  closeModal(modalRef: NgbModalRef | undefined): void {
    if (modalRef) {
      modalRef.close(); // or modalRef.dismiss() depending on your use case
    }
  }
}
