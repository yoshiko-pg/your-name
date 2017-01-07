import { Component, Inject, OnInit } from '@angular/core';
import { Store, STORE_TOKEN } from '../core/store';
import { User } from '../core/interfaces';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  userContainer: User[][] = [];

  constructor(
    @Inject(STORE_TOKEN) private store: Store,
  ) {
    store.on('updateUsers', this.sliceUsers.bind(this));
  }

  print() {
    window.print();
  }

  sliceUsers(originalUsers) {
    this.userContainer = [];
    const users = [].concat(originalUsers);

    while(users.length) {
      this.userContainer.push(users.splice(0, 10));
    }
  }

  ngOnInit() {
  }
}
