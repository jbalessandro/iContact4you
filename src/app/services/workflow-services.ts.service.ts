import { ComponentFactoryResolver, Injectable } from '@angular/core';
import * as workflowData from '../../assets/data/workflow-data.json';
import { IAction } from '../models/workflow/action';
import { IWorkflow } from '../models/workflow/workflow';
import { ActionConditionalComponent } from '../workflow/workflow/action-conditional/action-conditional.component';
import { ActionEmailComponent } from '../workflow/workflow/action-email/action-email.component';
import { ActionEndComponent } from '../workflow/workflow/action-end/action-end.component';
import { ActionStartComponent } from '../workflow/workflow/action-start/action-start.component';
import { ActionTimerComponent } from '../workflow/workflow/action-timer/action-timer.component';

@Injectable({
  providedIn: 'root'
})
export class WorkflowServices {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  getWorkFlow(): IWorkflow {
    let json = JSON.stringify(workflowData);
    json = json.replace('{"default":', '');
    json = json.slice(0, -1);
    let obj: IWorkflow = JSON.parse(json);
    return obj;
  }

  getWorkFlowAction(workFlow: IWorkflow, id: number): IAction {
      let actions = workFlow.actions;
      let action = actions.find(a => a.id === id);

      if (action != undefined)
        return action;

      let obj: IAction = {
        id: 0,
        type: '',
        parent: 0,
        next: 0,
        description: '',
        conditional: [],
        details: null
      };

      return obj;
  }

  createElement(action: IAction, formRef: any, workFlowData: IWorkflow) {
    switch (action.type) {
       case 'start':
         const start = this.createInstance(ActionStartComponent, formRef);
         start.instance.workFlowData = workFlowData;
         start.instance.action = action;
         break;
      case 'timer':
        const timer = this.createInstance(ActionTimerComponent, formRef);
        timer.instance.workFlowData = workFlowData;
        timer.instance.action = action;
        break;
      case 'email':
        const email = this.createInstance(ActionEmailComponent, formRef);
        email.instance.workFlowData = workFlowData;
        email.instance.action = action;
        break;
      case 'end':
        const end = this.createInstance(ActionEndComponent, formRef);
        end.instance.action = action;
        break;
      case 'conditional':
        const conditional = this.createInstance(ActionConditionalComponent, formRef);
        conditional.instance.workFlowData = workFlowData;
        conditional.instance.newstyle = 'margin-top:100px;';
        conditional.instance.action = action;
        break;
    }
  }

  createInstance(component: any, formRef: any): any {
    const newComponent = this.componentFactoryResolver.resolveComponentFactory(component);
    return formRef.createComponent(newComponent);
  }
}
