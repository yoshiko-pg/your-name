import { OpaqueToken } from '@angular/core/src/di/opaque_token';
import { EventEmitter } from './event-emitter'

export class ActionCreator {
  constructor(private dispatcher: EventEmitter) {
  }

  updateUsers(users: Object[]) {
    this.dispatcher.emit("updateUsers", users);
  }
}

export const ACTION_CREATOR_TOKEN = new OpaqueToken('actionCreator');
export function actionCreatorFactory(dispatcher: EventEmitter) { return new ActionCreator(dispatcher); }
