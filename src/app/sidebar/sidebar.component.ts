import { Component, Inject, OnInit } from '@angular/core';
import { ActionCreator, ACTION_CREATOR_TOKEN } from '../core/action-creator'
import { ParticipationService } from '../services/participation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [ParticipationService],
})
export class SidebarComponent implements OnInit {
  url: string;

  constructor(
    private service: ParticipationService,
    @Inject(ACTION_CREATOR_TOKEN) private actions: ActionCreator,
  ) {
  }

  submit() {
    this.service.fetch(this.url).subscribe((users) => this.actions.updateUsers(users));
  }

  ngOnInit() {
  }
}
