import { Component, OnInit } from '@angular/core';
import { ActionCreator } from '../../core/action-creator';
import { Store } from "../../core/store";
import { PRESETS, Preset } from "../../core/constants";

@Component({
  selector: 'app-design-changer',
  templateUrl: './design-changer.component.html',
  styleUrls: ['./design-changer.component.css']
})
export class DesignChangerComponent implements OnInit {

  PRESETS: Preset[] = PRESETS;
  currentBgUrl: string;
  customBgUrl: string;

  constructor(private action: ActionCreator, private store: Store) {
  }

  custom({ srcElement }: { srcElement: HTMLInputElement }) {
    if (!srcElement.files.length) {
      return;
    }
    this.customBgUrl = URL.createObjectURL(srcElement.files[0]);
    this.action.changeBackgroundUrl(this.customBgUrl);
  }

  setBackgroundUrl(url) {
    this.action.changeBackgroundUrl(url);
  }

  changeBackgroundUrl() {
    this.currentBgUrl = this.store.backgroundUrl;
  }

  ngOnInit() {
    this.store.on('change', this.changeBackgroundUrl.bind(this));
  }
}
