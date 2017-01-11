import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store, STORE_TOKEN } from '../../core/store';
import { User } from '../../core/interfaces';
import { Users, UserKind, USER_KINDS } from '../../core/constants';
import { PrintedDialogComponent } from '../printed-dialog/printed-dialog.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  userContainer: User[][] = [];
  loading: boolean = false;

  constructor(
    @Inject(STORE_TOKEN) private store: Store,
    private dialog: MdDialog,
  ) {
    store.on('change', this.pickUsers.bind(this));
    store.on('change', () => this.loading = this.store.fetching);
  }

  print(): void {
    window.print();
    this.dialog.open(PrintedDialogComponent);
  }

  pickUsers() {
    const users: Users = this.store.users;
    const kinds: UserKind[] = this.store.includeUserKinds;
    const waitingNumber: number = this.store.waitingNumber;
    const userArray: User[] = [];

    USER_KINDS.filter((KIND) => {
      return kinds.includes(KIND) && users[KIND.KEY];
    }).forEach(({KEY}) => {
      const max = KEY === 'waiting' ? waitingNumber : users[KEY].length;
      userArray.push(...users[KEY].slice(0, max));
    });

    this.sliceUsers(userArray);
  }

  sliceUsers(users: User[]): void {
    this.userContainer = [];
    while (users.length) {
      this.userContainer.push(users.splice(0, 10));
    }
  }

  ngOnInit() {
  }
}
