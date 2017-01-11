import { Observable } from "rxjs";
import { OpaqueToken } from '@angular/core/src/di/opaque_token';

import { EventEmitter } from './event-emitter';
import { User } from './interfaces';
import { UserKind } from './constants';
import { ParticipationService } from '../services/participation.service';

export class ActionCreator {
  constructor(private dispatcher: EventEmitter, private service: ParticipationService) {
  }

  checkUserKind(userKind: UserKind, checked: boolean): void {
    this.dispatcher.emit(checked ? 'includeUserKind' : 'excludeUserKind', userKind);
  }

  updateUsers(url: string, userKinds: UserKind[]): void {
    this.fetchUsers(url, userKinds).subscribe((users: User[]) => {
        this.dispatcher.emit('updateUsers', users);
        this.dispatcher.emit('fetchingUsers', false);
    });
  }

  fetchUsers(url: string, userKinds: UserKind[]): Observable<User[]> {
    this.dispatcher.emit('fetchingUsers', true);
    return this.service.fetch(url, userKinds);
  }
}

export const ACTION_CREATOR_TOKEN = new OpaqueToken('actionCreator');
export function actionCreatorFactory(dispatcher: EventEmitter, service: ParticipationService) {
  return new ActionCreator(dispatcher, service);
}
