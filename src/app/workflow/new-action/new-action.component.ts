import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { IAction } from 'src/app/models/workflow/action';
import { IWorkflow } from 'src/app/models/workflow/workflow';
import { WorkflowServices } from 'src/app/services/workflow-services.ts.service';

@Component({
  selector: 'app-new-action',
  templateUrl: './new-action.component.html',
  styleUrls: ['./new-action.component.scss']
})
export class NewActionComponent implements OnInit {
  @Input() action!: IAction;
  @Input() workFlowData!: IWorkflow;
  title = 'Select one action';
  closeResult: string = '';
  actionOptions = true;
  actionTimer = false;
  
  constructor(private modalService: NgbModal, private workflowServices: WorkflowServices) { }

  ngOnInit(): void {
    this.title = 'Select one action';
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size:'lg', backdrop: 'static'}).result.then((result) => {
      this.selectAction('reset');
      this.closeResult = `Closed with: ${result}`;
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

  selectAction(action:string): void {
    this.actionOptions = false;
    this.actionTimer = false;
    
    if (action && action != 'reset'){
      if (action == 'timer') {
        this.actionTimer = true;
        this.title = 'Add timer';
      }
    } else {
      this.actionOptions = true;
      this.title = 'Select one action';
    }
  }

  responseAction(action:string) {
    if (action == 'saved'){
      this.workflowServices.setUpdateWorkFlowScreen(new Date());
      this.modalService.dismissAll();
    } else if (action == 'close') {
      this.modalService.dismissAll();
    }
  }
}
