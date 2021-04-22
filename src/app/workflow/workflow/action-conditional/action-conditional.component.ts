import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input, AfterViewInit } from '@angular/core';
import { IAction } from 'src/app/models/workflow/action';
import { IWorkflow } from 'src/app/models/workflow/workflow';
import { WorkflowServices } from 'src/app/services/workflow-services.ts.service';

@Component({
  selector: 'app-action-conditional',
  templateUrl: './action-conditional.component.html',
  styleUrls: ['./action-conditional.component.scss']
})
export class ActionConditionalComponent implements OnInit {
  @ViewChild('conditionalTemplateLeft', { read: ViewContainerRef, static: true }) formRefLeft: any;
  @ViewChild('conditionalTemplateRight', { read: ViewContainerRef, static: true }) formRefRight: any;
  @Input() workFlowData!: IWorkflow;
  @Input() action!: IAction;
  
  constructor(
    private workflowServices: WorkflowServices
  ) { }

  ngOnInit(): void {
    this.createWorkFlow();
  }

  ngAfterViewInit(): void {
  }

  createWorkFlow(): void {
    if (this.action.conditional != null){
      let conditionals = this.action.conditional;
      if (conditionals != undefined) {
        let action0 = this.workflowServices.getWorkFlowAction(this.workFlowData, conditionals[0]);
        let action1 = this.workflowServices.getWorkFlowAction(this.workFlowData, conditionals[1]);
        this.workflowServices.createElement(action0, this.formRefLeft, this.workFlowData);
        this.workflowServices.createElement(action1, this.formRefRight, this.workFlowData);
      }
    }
  }
}
