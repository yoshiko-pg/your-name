import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ShareButtonsModule } from 'ng2-sharebuttons';

import { ActionCreator } from './core/action-creator';
import { EventEmitter, PRIMARY_EVENT_EMITTER } from './core/event-emitter';
import { Store } from './core/store';

import { ParticipationService } from './services/participation.service';

import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PreviewComponent } from './components/preview/preview.component';
import { PrintedDialogComponent } from './components/printed-dialog/printed-dialog.component';
import { ShareButtonsComponent } from './components/share-buttons/share-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardComponent,
    SidebarComponent,
    PreviewComponent,
    PrintedDialogComponent,
    ShareButtonsComponent,
  ],
  entryComponents: [
    PrintedDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    JsonpModule,
    MaterialModule.forRoot(),
    ShareButtonsModule,
  ],
  providers: [
    { provide: PRIMARY_EVENT_EMITTER, useClass: EventEmitter } ,
    ParticipationService,
    Store,
    ActionCreator,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
