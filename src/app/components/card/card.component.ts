import { Component, Input, OnInit } from '@angular/core';
import { User, EventInfo } from '../../core/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() user: User;
  @Input() eventInfo: EventInfo;

  constructor() { }

  ngOnInit() {
  }
}
