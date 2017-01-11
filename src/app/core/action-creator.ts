import { OpaqueToken } from '@angular/core/src/di/opaque_token';
import { EventEmitter } from './event-emitter';
import { User } from './interfaces';
import { ParticipationService } from '../services/participation.service';
import {Observable} from "rxjs";

export class ActionCreator {
  constructor(private dispatcher: EventEmitter, private service: ParticipationService) {
  }

  updateUsers(url: string): void {
    this.fetchUsers(url).subscribe((users: User[]) => {
        this.dispatcher.emit('updateUsers', users);
        this.dispatcher.emit('fetchingUsers', false);
    });
  }

  fetchUsers(url: string): Observable<User[]> {
    this.dispatcher.emit('fetchingUsers', true);
    return this.service.fetch(url);
  }
}

export const ACTION_CREATOR_TOKEN = new OpaqueToken('actionCreator');
export function actionCreatorFactory(dispatcher: EventEmitter, service: ParticipationService) {
  return new ActionCreator(dispatcher, service);
}
