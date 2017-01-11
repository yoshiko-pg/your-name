import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Store, STORE_TOKEN } from '../../core/store';
import { User } from '../../core/interfaces';
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
    store.on('change', this.sliceUsers.bind(this));
    store.on('change', () => this.loading = this.store.fetching);
  }

  print(): void {
    window.print();
    this.dialog.open(PrintedDialogComponent);
  }

  sliceUsers(): void {
    this.userContainer = [];
    const users = [].concat(this.store.users);

    while (users.length) {
      this.userContainer.push(users.splice(0, 10));
    }
  }

  ngOnInit() {
  }
}
