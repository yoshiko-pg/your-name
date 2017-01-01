import { Component, NgModule } from '@angular/core';
import { CardsComponent } from './cards/cards.component'

@NgModule({
  declarations: [CardsComponent],
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url: string;
}
