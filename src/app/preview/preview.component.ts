import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store, STORE_TOKEN } from '../core/store';
import { User } from '../core/interfaces';
import { PrintedDialogComponent } from '../printed-dialog/printed-dialog.component';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent implements OnInit {
  userContainer: User[][] = [];

  constructor(
    @Inject(STORE_TOKEN) private store: Store,
    private dialog: MdDialog,
  ) {
    store.on('updateUsers', this.sliceUsers.bind(this));
  }

  print(): void {
    window.print();
    this.dialog.open(PrintedDialogComponent);
  }

  sliceUsers(originalUsers: User[]): void {
    this.userContainer = [];
    const users = [].concat(originalUsers);

    while (users.length) {
      this.userContainer.push(users.splice(0, 10));
    }
  }

  ngOnInit() {
  }
}
