import { OpaqueToken } from '@angular/core/src/di/opaque_token';
import { EventEmitter } from './event-emitter';
import { User } from './interfaces';

interface State {
  users: User[];
  fetching: boolean;
}

export class Store extends EventEmitter {
  private state: State = {
    users: [],
    fetching: false,
  };

  constructor(private dispatcher: EventEmitter) {
    super();
    this.dispatcher.on('updateUsers', this.updateUsers.bind(this));
    this.dispatcher.on('fetchingUsers', this.fetchingUsers.bind(this));
  }

  updateUsers(users: User[]): void {
    this.state.users = users;
    this.emit('change');
  }

  fetchingUsers(status: boolean): void {
    this.state.fetching = status;
    this.emit('change');
  }

  get users(): User[] {
    return this.state.users;
  }

  get fetching(): boolean {
      return this.state.fetching;
  }
}

export const STORE_TOKEN = new OpaqueToken('store');
export function storeFactory(dispatcher: EventEmitter) { return new Store(dispatcher); }
