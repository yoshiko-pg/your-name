import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  template: `<app-card *ngFor="let user of users" [user]="user"></app-card>`,
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() users: Object[];

  constructor() { }

  ngOnInit() {
  }
}
