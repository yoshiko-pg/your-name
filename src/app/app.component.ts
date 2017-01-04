import { Component, Inject } from '@angular/core';
import { ActionCreator, ACTION_CREATOR_TOKEN } from './core/action-creator'
import { Store, STORE_TOKEN } from './core/store'
import { ParticipationService } from './services/participation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ParticipationService],
})
export class AppComponent {
  url: string;
  users: Object[];

  constructor(
    private service: ParticipationService,
    @Inject(ACTION_CREATOR_TOKEN) private actions: ActionCreator,
    @Inject(STORE_TOKEN) private store: Store,
  ) {
    store.on("updateUsers", (users) => this.users = users);
  }

  submit() {
    this.service.fetch(this.url).subscribe((users) => this.actions.updateUsers(users));
  }
}
