import { OpaqueToken } from '@angular/core/src/di/opaque_token';
import { EventEmitter } from './event-emitter';
import { User } from './interfaces';
import { ParticipationService } from '../services/participation.service';

export class ActionCreator {
  constructor(private dispatcher: EventEmitter, private service: ParticipationService) {
  }

  updateUsers(url: string): void {
    this.service.fetch(url).subscribe((users: User[]) => this.dispatcher.emit('updateUsers', users));
  }
}

export const ACTION_CREATOR_TOKEN = new OpaqueToken('actionCreator');
export function actionCreatorFactory(dispatcher: EventEmitter, service: ParticipationService) {
  return new ActionCreator(dispatcher, service);
}
