import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IAction } from 'src/app/models/workflow/action';
import { IWorkflow } from 'src/app/models/workflow/workflow';
import { WorkflowServices } from 'src/app/services/workflow-services.ts.service';

@Component({
  selector: 'app-action-email',
  templateUrl: './action-email.component.html',
  styleUrls: ['./action-email.component.scss']
})
export class ActionEmailComponent implements OnInit {
  @Input() workFlowData!: IWorkflow;
  @Input() action!: IAction;
  @ViewChild('mainTemplate', { read: ViewContainerRef, static: true }) formRef: any;
  
  constructor(
    private workflowServices: WorkflowServices
  ) { }

  ngOnInit(): void {
    this.createWorkFlow();
  }

  createWorkFlow(): void {
    if (this.action.next != null){
      let action = this.workflowServices.getWorkFlowAction(this.workFlowData, this.action.next);
      this.workflowServices.createElement(action, this.formRef, this.workFlowData);  
    }
  }
}
