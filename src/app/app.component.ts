import { Component } from '@angular/core';
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

  constructor(private service: ParticipationService) {
  }

  submit() {
    this.service.fetch(this.url).subscribe((users) => this.users = users);
  }
}
