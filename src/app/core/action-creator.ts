import { Observable } from "rxjs";
import { OpaqueToken } from '@angular/core';

import { EventEmitter } from './event-emitter';
import { UserKind } from './constants';
import { ParticipationService } from '../services/participation.service';

export class ActionCreator {
  constructor(private dispatcher: EventEmitter, private service: ParticipationService) {
  }

  checkUserKind(userKind: UserKind, checked: boolean): void {
    this.dispatcher.emit(checked ? 'includeUserKind' : 'excludeUserKind', userKind);
  }

  changeWaitingNumber(num: number): void {
    this.dispatcher.emit('changeWaitingNumber', num);
  }

  updateUsers(url: string): void {
    this.fetch(url).subscribe((dom: Document) => {
      const users = this.service.extractUsers(dom);
      const eventInfo = this.service.extractEventInfo(dom);

      this.dispatcher.emit('updateEventInfo', eventInfo);
      this.dispatcher.emit('updateUsers', users);
      this.dispatcher.emit('fetchingUsers', false);
    });
  }

  fetch(url: string): Observable<Document> {
    this.dispatcher.emit('fetchingUsers', true);
    return this.service.fetchDom(url);
  }
}

export const ACTION_CREATOR_TOKEN = new OpaqueToken('actionCreator');
export function actionCreatorFactory(dispatcher: EventEmitter, service: ParticipationService) {
  return new ActionCreator(dispatcher, service);
}
