import { Component, Input, OnInit } from '@angular/core';
import { User, EventInfo } from '../../core/interfaces';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() users: User[];
  @Input() eventInfo: EventInfo;
  @Input() pageSum: number;

  constructor() { }

  ngOnInit() {
  }
}
