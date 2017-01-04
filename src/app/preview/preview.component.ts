import { Component, Inject, OnInit } from '@angular/core';
import { Store, STORE_TOKEN } from '../core/store';
import { User } from '../core/interfaces';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  users: User[];

  constructor(
    @Inject(STORE_TOKEN) private store: Store,
  ) {
    store.on('updateUsers', (users) => this.users = users);
  }

  ngOnInit() {
  }
}
