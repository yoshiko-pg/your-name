import { Component, Inject, OnInit } from '@angular/core';
import { ActionCreator, ACTION_CREATOR_TOKEN } from '../../core/action-creator';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  url: string;

  constructor(@Inject(ACTION_CREATOR_TOKEN) private actions: ActionCreator) {
  }

  submit(): void {
    if (!this.url) {
      return;
    }

    this.actions.updateUsers(this.url);
  }

  ngOnInit() {
  }
}
