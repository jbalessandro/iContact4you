import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAction } from 'src/app/models/workflow/action';
import { IWorkflow } from 'src/app/models/workflow/workflow';
import { WorkflowServices } from 'src/app/services/workflow-services.ts.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit, OnDestroy {
  @ViewChild('mainTemplate', { read: ViewContainerRef, static: true }) formRef: any;
  subscription: Subscription;
  updateWorkFlow: Subscription;
  workFlowData!: IWorkflow;
  action!: IAction;

  constructor(    
    public viewContainerRef: ViewContainerRef,
    private workflowServices: WorkflowServices
  ) {
    this.subscription = this.workflowServices.getWorkFlow().subscribe(message => {
      if (message) {
        this.workFlowData = message;
      }
    });
    this.updateWorkFlow = this.workflowServices.getUpdateWorkFlowScreen().subscribe(message => {
      debugger;
      this.createWorkFlow();
    })
  }

  ngOnInit(): void {
    this.getWorkFlow();
  }

  getWorkFlow(): void {
    //this.workFlowData = this.workflowServices.getWorkFlow();    
    this.workflowServices.getWorkFlowFromDB();
    this.createWorkFlow();
  }

  createWorkFlow(): void {
    this.action = this.workflowServices.getWorkFlowAction(this.workFlowData, this.workFlowData.actions[0].id);
    this.createElement(this.action);
  }
  
  createElement(action: IAction) {
    this.workflowServices.createElement(action, this.formRef, this.workFlowData);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
