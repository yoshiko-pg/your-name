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
  className: string;

  constructor(private store: Store, private element: ElementRef) {
    this.changePreset();
    this.store.on('change', this.changePreset.bind(this));
  }

  changePreset() {
    const { preset } = this.store;
    this.className = preset.className;

    const url = preset.className === 'custom' ? this.store.customBgUrl : this.store.preset.backgroundUrl;
    this.element.nativeElement.style.backgroundImage = `url("${url}")`;
  }
}
