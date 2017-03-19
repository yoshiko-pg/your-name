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
  currentPreset: Preset = null;
  customBgUrl: string;

  constructor(private action: ActionCreator, private store: Store) {
    this.currentPreset = store.preset;
  }

  custom({ srcElement }: { srcElement: HTMLInputElement }) {
    if (!srcElement.files.length) {
      return;
    }
    this.customBgUrl = URL.createObjectURL(srcElement.files[0]);
    this.action.uploadCustomBg(this.customBgUrl);
  }

  changeToCustomPreset() {
    this.changePreset(this.store.customPreset);
  }

  changePreset(preset: Preset) {
    this.action.changePreset(preset);
  }

  setPreset() {
    this.currentPreset = this.store.preset;
  }

  ngOnInit() {
    this.store.on('change', this.setPreset.bind(this));
  }
}
