import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IAction } from 'src/app/models/workflow/action';
import { IWorkflow } from 'src/app/models/workflow/workflow';
import { WorkflowServices } from 'src/app/services/workflow-services.ts.service';

@Component({
  selector: 'app-action-timer',
  templateUrl: './action-timer.component.html',
  styleUrls: ['./action-timer.component.scss']
})
export class ActionTimerComponent implements OnInit {
  @Input() workFlowData!: IWorkflow;
  @Input() action!: IAction;
  @Input() newstyle: string = '';
  @ViewChild('mainTemplate', { read: ViewContainerRef, static: true }) formRef: any;
  
  constructor(
    private workflowServices: WorkflowServices
  ) { }

  getBoxSettings(){
    return this.newstyle;
  }

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
