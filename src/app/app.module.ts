import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import {
  MdCommonModule,
  MdCoreModule,
  MdButtonModule,
  MdDialogModule,
  MdInputModule,
  MdIconModule,
  MdCheckboxModule,
  MdProgressSpinnerModule,
  MdTooltipModule,
  MdSnackBarModule,
} from '@angular/material';

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
import { DesignChangerComponent } from './components/design-changer/design-changer.component';

import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardComponent,
    SidebarComponent,
    PreviewComponent,
    PrintedDialogComponent,
    ShareButtonsComponent,
    DesignChangerComponent,
    SafePipe,
  ],
  entryComponents: [
    PrintedDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MdCommonModule,
    MdCoreModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdIconModule,
    MdCheckboxModule,
    MdProgressSpinnerModule,
    MdTooltipModule,
    MdSnackBarModule,
    ShareButtonsModule.forRoot(),
  ],
  providers: [
    { provide: PRIMARY_EVENT_EMITTER, useClass: EventEmitter },
    ParticipationService,
    Store,
    ActionCreator,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
