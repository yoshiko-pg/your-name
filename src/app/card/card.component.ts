import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <img src="{{user.avatar}}" alt="{{user.name}}">
    <span>{{user.name}}</span>
  `,
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}
