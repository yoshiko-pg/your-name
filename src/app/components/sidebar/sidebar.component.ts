import { Component, Inject, OnInit } from '@angular/core';
import { ActionCreator } from '../../core/action-creator';
import { Store } from '../../core/store';
import { USER_KINDS, UserKind } from '../../core/constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  url: string;
  userKinds: UserKind[] = USER_KINDS;
  selected: UserKind[];
  waitingNumber: number;
  loading = false;

  demoUrl = 'https://goodpatch.connpass.com/event/26109/';

  constructor(
    private actions: ActionCreator,
    private store: Store,
  ) {
    this.selected = this.store.includeUserKinds;
    this.waitingNumber = this.store.waitingNumber;

    store.on('change', () => this.url = this.store.url);
    store.on('change', () => this.selected = this.store.includeUserKinds);
    store.on('change', () => this.loading = this.store.fetching);
  }

  changeUrl(url: string) {
    this.actions.changeUrl(url);
  }

  checkUserKind(userKind: UserKind, { checked }) {
    this.actions.checkUserKind(userKind, checked);
  }

  changeWaitingNumber(num) {
    this.actions.changeWaitingNumber(num);
  }

  submit(): void {
    if (!this.store.isValidSource) {
      return;
    }

    const kind = this.store.eventSourceKind;
    this.actions.updateUsers(this.url, kind);
  }

  showDemo() {
    this.changeUrl(this.demoUrl);
    this.submit();
  }

  ngOnInit() {
  }
}
