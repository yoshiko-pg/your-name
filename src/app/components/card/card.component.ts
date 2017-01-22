import { Component, Input, ElementRef } from '@angular/core';
import { User, EventInfo } from '../../core/interfaces';
import { Store } from '../../core/store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() user: User;
  @Input() eventInfo: EventInfo;

  constructor(private store: Store, private element: ElementRef) {
    this.changeBackgroundUrl();
    this.store.on('change', this.changeBackgroundUrl.bind(this));
  }

  changeBackgroundUrl() {
    this.element.nativeElement.style.backgroundImage = `url("${this.store.backgroundUrl}")`;
  }
}
