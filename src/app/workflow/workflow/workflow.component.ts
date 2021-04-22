import { AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IAction } from 'src/app/models/workflow/action';
import { IWorkflow } from 'src/app/models/workflow/workflow';
import { WorkflowServices } from 'src/app/services/workflow-services.ts.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit, AfterViewInit {
  @ViewChild('mainTemplate', { read: ViewContainerRef, static: true }) formRef: any;
  workFlowData!: IWorkflow;
  
  constructor(    
    public viewContainerRef: ViewContainerRef,
    private workflowServices: WorkflowServices
  ) {}

  ngOnInit(): void {
    this.getWorkFlow();
  }

  ngAfterViewInit(): void {

  }

  getWorkFlow(): void {
    this.workFlowData = this.workflowServices.getWorkFlow();    
    this.createWorkFlow();
  }

  createWorkFlow(): void {
    let action = this.workflowServices.getWorkFlowAction(this.workFlowData, this.workFlowData.actions[0].id);
    this.createElement(action);
  }
  
  createElement(action: IAction) {
    this.workflowServices.createElement(action, this.formRef, this.workFlowData);
  }
}
