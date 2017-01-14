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
  selected: UserKind[] = this.store.includeUserKinds;
  waitingNumber: number = this.store.waitingNumber;
  loading: boolean = false;

  urlMatcher: RegExp = /^https:\/\/(.+?\.)?connpass\.com\/event\/\d{1,5}\/?$/;
  demoUrl: string = 'https://goodpatch.connpass.com/event/26109/';

  constructor(
    private actions: ActionCreator,
    private store: Store,
  ) {
    store.on('change', () => this.selected = this.store.includeUserKinds);
    store.on('change', () => this.loading = this.store.fetching);
  }

  checkUserKind(userKind: UserKind, {checked}) {
    this.actions.checkUserKind(userKind, checked);
  }

  changeWaitingNumber(num) {
    this.actions.changeWaitingNumber(num);
  }

  submit(): void {
    if (!this.urlMatcher.test(this.url)) {
      return;
    }

    this.actions.updateUsers(this.url);
  }

  showDemo() {
    this.url = this.demoUrl;
    this.submit();
  }

  ngOnInit() {
  }
}
