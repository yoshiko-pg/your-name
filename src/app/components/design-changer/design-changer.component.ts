import { Component, OnInit } from '@angular/core';
import { ActionCreator } from "../../core/action-creator";

@Component({
  selector: 'app-design-changer',
  templateUrl: './design-changer.component.html',
  styleUrls: ['./design-changer.component.css']
})
export class DesignChangerComponent implements OnInit {

  customBgUrl: string;

  constructor(private action: ActionCreator) { }

  custom({srcElement}: {srcElement: HTMLInputElement}) {
    if (!srcElement.files.length) {
      return;
    }
    this.customBgUrl = URL.createObjectURL(srcElement.files[0]);
    this.action.changeBackgroundUrl(this.customBgUrl);
  }

  ngOnInit() {
  }
}
