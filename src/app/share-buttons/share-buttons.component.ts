import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.css']
})
export class ShareButtonsComponent implements OnInit {
  @Input() created: boolean = false;

  text: string = 'Connpass Name Card Generator';
  url: string = 'https://yoshiko-pg.github.io/connpass-card/';

  constructor() { }

  ngOnInit() {
  }
}
