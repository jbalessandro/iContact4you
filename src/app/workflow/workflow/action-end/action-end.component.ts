import { Component, Input, OnInit } from '@angular/core';
import { IAction } from 'src/app/models/workflow/action';

@Component({
  selector: 'app-action-end',
  templateUrl: './action-end.component.html',
  styleUrls: ['./action-end.component.scss']
})
export class ActionEndComponent implements OnInit {
  @Input() action!: IAction;
  
  constructor() { }

  ngOnInit(): void {
  }

}
