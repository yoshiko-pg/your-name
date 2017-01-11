import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../core/interfaces';

@Component({
  selector: 'app-card',
  template: `
    <img src="{{user.avatar}}" alt="{{user.name}}">
    <span class="name">{{user.name}}</span>
  `,
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }
}
