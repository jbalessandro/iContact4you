import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAction } from 'src/app/models/workflow/action';
import { IWorkflow } from 'src/app/models/workflow/workflow';
import { WorkflowServices } from 'src/app/services/workflow-services.ts.service';

@Component({
  selector: 'app-new-action-timer',
  templateUrl: './new-action-timer.component.html',
  styleUrls: ['./new-action-timer.component.scss']
})
export class NewActionTimerComponent implements OnInit, OnDestroy {
  @Input() action!: IAction;
  @Input() workFlowData!: IWorkflow;
  @Output() responseAction = new EventEmitter<string>();
  subscription: Subscription;
  intervals = ['Hours','Minutes','Days','Months'];
  interval = this.intervals[0];
  quantity = 1;

  constructor(
    private workflowServices: WorkflowServices
  ) {
    this.subscription = this.workflowServices.getWorkFlow().subscribe(data => {
      if (data) {
        this.workFlowData = data;
      }
    });
   }

  ngOnInit(): void {
    
  }

  addTimer(): void {
    let newAction: IAction = {
      id: 0,
      type: 'timer',
      parent: this.action.id,
      next: this.action.next,
      description: 'new timer',
      conditional: [],
      details: null
    };
    this.workflowServices.addAction(this.workFlowData, this.action, newAction);
    this.responseAction.emit('saved');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
