import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog, MdSnackBar } from '@angular/material';
import { Store } from '../../core/store';
import { User, EventInfo } from '../../core/interfaces';
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
  eventInfo: EventInfo;

  constructor(
    private store: Store,
    private dialog: MdDialog,
    public snackBar: MdSnackBar,
  ) {
    store.on('change', this.pickUsers.bind(this));
    store.on('change', () => this.eventInfo = this.store.eventInfo);
    store.on('change', () => this.loading = this.store.fetching);
  }

  print(): void {
    window.print();
    this.dialog.open(PrintedDialogComponent);
  }

  openPrintAlert(): void {
    this.snackBar.open('※印刷ダイアログ内で「背景のグラフィック」のチェックをオンにしてください');
  }

  pickUsers() {
    const users: Users = this.store.users;
    const kinds: UserKind[] = this.store.includeUserKinds;
    const waitingNumber: number = this.store.waitingNumber;
    const userArray: User[] = [];

    USER_KINDS.filter((KIND) => {
      return kinds.includes(KIND) && users[KIND.KEY];
    }).forEach(({ KEY }) => {
      const max = KEY === 'waiting' ? waitingNumber : users[KEY].length;

      userArray.push(...users[KEY].slice(0, max));
    });

    this.sliceUsers(userArray.sort(this._sortUsers).filter((item, index, self) => {
      return self.map((i) => `${i.name}${i.avatar}`).indexOf(`${item.name}${item.avatar}`) === index;
    }));
  }

  sliceUsers(users: User[]): void {
    this.userContainer = [];
    while (users.length) {
      this.userContainer.push(users.splice(0, 10));
    }
  }

  ngOnInit() {
  }

  _sortUsers(a: User, b: User) {
    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  }
}
