import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionConditionalComponent } from './workflow/workflow/action-conditional/action-conditional.component';
import { ActionEmailComponent } from './workflow/workflow/action-email/action-email.component';
import { ActionEndComponent } from './workflow/workflow/action-end/action-end.component';
import { ActionStartComponent } from './workflow/workflow/action-start/action-start.component';
import { ActionTimerComponent } from './workflow/workflow/action-timer/action-timer.component';
import { WorkflowComponent } from './workflow/workflow/workflow.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkflowComponent,
    ActionStartComponent,
    ActionEmailComponent,
    ActionTimerComponent,
    ActionConditionalComponent,
    ActionEndComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
