import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';

import { EventEmitter } from './core/event-emitter'
import { actionCreatorFactory, ACTION_CREATOR_TOKEN } from './core/action-creator'
import { storeFactory, STORE_TOKEN } from './core/store'

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    JsonpModule
  ],
  providers: [EventEmitter, {
    provide: ACTION_CREATOR_TOKEN,
    useFactory: actionCreatorFactory,
    deps: [EventEmitter],
  }, {
    provide: STORE_TOKEN,
    useFactory: storeFactory,
    deps: [EventEmitter],
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
