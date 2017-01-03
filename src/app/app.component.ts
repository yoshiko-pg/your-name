import { Component, NgModule } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { ParticipationService } from './services/participation.service';


@NgModule({
  declarations: [CardsComponent],
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ParticipationService],
})
export class AppComponent {
  // TMP
  url: string = 'https://goodpatch.connpass.com/event/33930/participation/';

  constructor(private service: ParticipationService) {
  }

  submit() {
    this.service.fetch(this.url).subscribe((data) => {
      // eslint-disable-next-line
      console.log(data);
    });
  }
}
