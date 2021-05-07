import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IAction } from 'src/app/models/workflow/action';
import { IWorkflow } from 'src/app/models/workflow/workflow';
import { WorkflowServices } from 'src/app/services/workflow-services.ts.service';

@Component({
  selector: 'app-remove-action',
  templateUrl: './remove-action.component.html',
  styleUrls: ['./remove-action.component.scss']
})
export class RemoveActionComponent implements OnInit {
  @Input() action!: IAction;
  @Input() workFlowData!: IWorkflow;
  title = 'Attention';
  closeResult: string = '';

  constructor(private modalService: NgbModal, private workflowServices: WorkflowServices) { }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'lg', backdrop: 'static'}).result.then((result) => {
      this.removeAction(result);
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  removeAction(reason: any) {
    if (reason === 'confirm') {
      this.workflowServices.removeAction(this.workFlowData, this.action);
      this.workflowServices.setUpdateWorkFlowScreen(new Date());
      this.modalService.dismissAll();  
    }
  }
}
