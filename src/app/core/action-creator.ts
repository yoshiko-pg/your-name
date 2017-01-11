import { Observable } from "rxjs";
import { OpaqueToken } from '@angular/core/src/di/opaque_token';

import { EventEmitter } from './event-emitter';
import { UserKind, Users } from './constants';
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
    this.fetchUsers(url).subscribe((users: Users) => {
        this.dispatcher.emit('updateUsers', users);
        this.dispatcher.emit('fetchingUsers', false);
    });
  }

  fetchUsers(url: string): Observable<Users> {
    this.dispatcher.emit('fetchingUsers', true);
    return this.service.fetch(url);
  }
}

export const ACTION_CREATOR_TOKEN = new OpaqueToken('actionCreator');
export function actionCreatorFactory(dispatcher: EventEmitter, service: ParticipationService) {
  return new ActionCreator(dispatcher, service);
}
