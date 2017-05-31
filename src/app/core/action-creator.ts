import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';

import { EventEmitter, PRIMARY_EVENT_EMITTER } from './event-emitter';
import { UserKind, Preset, EventSourceKind } from './constants';
import { ParticipationService } from '../services/participation.service';

@Injectable()
export class ActionCreator {
  constructor(
    @Inject(PRIMARY_EVENT_EMITTER) private dispatcher: EventEmitter,
    private service: ParticipationService,
  ) { }

  changeUrl(url: string) {
    this.dispatcher.emit('changeUrl', url);
  }

  checkUserKind(userKind: UserKind, checked: boolean): void {
    this.dispatcher.emit(checked ? 'includeUserKind' : 'excludeUserKind', userKind);
  }

  changeWaitingNumber(num: number): void {
    this.dispatcher.emit('changeWaitingNumber', num);
  }

  changePreset(preset: Preset): void {
    this.dispatcher.emit('changePreset', preset);
  }

  uploadCustomBg(url: string): void {
    this.dispatcher.emit('uploadCustomBg', url);
  }

  updateUsers(url: string, eventSourceKind: EventSourceKind): void {
    this.fetch(url, eventSourceKind).subscribe(() => {
      const users = this.service.extractUsers();
      const eventInfo = this.service.extractEventInfo();

      this.dispatcher.emit('updateEventInfo', eventInfo);
      this.dispatcher.emit('updateUsers', users);
      this.dispatcher.emit('fetchingUsers', false);
    });
  }

  fetch(url: string, eventSourceKind: EventSourceKind): Observable<Document> {
    this.dispatcher.emit('fetchingUsers', true);

    return this.service.fetch({ url, type: eventSourceKind });
  }
}
