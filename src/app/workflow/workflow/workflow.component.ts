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
  components:any = [];

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
      this.removeElement();
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
    const newComponent = this.workflowServices.createElement(action, this.formRef, this.workFlowData);
    this.components.push(newComponent);
  }

  removeElement() {
    var component = this.components[0];
    this.workflowServices.removeComponent(component, this.formRef);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
