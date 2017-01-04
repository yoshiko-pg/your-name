import { OpaqueToken } from '@angular/core/src/di/opaque_token';
import { EventEmitter } from './event-emitter';
import { User } from './interfaces';

interface State {
  users: User[];
}

export class Store extends EventEmitter {
  private state: State = {
    users: [],
  };

  constructor(private dispatcher: EventEmitter) {
    super();
    this.dispatcher.on('updateUsers', this.updateUsers.bind(this));
  }

  updateUsers(users: User[]): void {
    this.state.users = users;
    this.emit('updateUsers', this.users);
  }

  get users(): User[] {
    return this.state.users;
  }
}

export const STORE_TOKEN = new OpaqueToken('store');
export function storeFactory(dispatcher: EventEmitter) { return new Store(dispatcher); }
