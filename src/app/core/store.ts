import { OpaqueToken } from '@angular/core/src/di/opaque_token';

import { EventEmitter } from './event-emitter';
import { User } from './interfaces';
import { USER_KINDS, UserKind } from './constants';

interface State {
  users: User[];
  includeUserKinds: UserKind[];
  waitingNumber: number;
  fetching: boolean;
}

export class Store extends EventEmitter {
  private state: State = {
    users: [],
    includeUserKinds: USER_KINDS.filter((k) => k.KEY === 'participant'),
    waitingNumber: 10,
    fetching: false,
  };

  constructor(private dispatcher: EventEmitter) {
    super();
    this.dispatcher.on('includeUserKind', this.includeUserKind.bind(this));
    this.dispatcher.on('excludeUserKind', this.excludeUserKind.bind(this));
    this.dispatcher.on('changeWaitingNumber', this.changeWaitingNumber.bind(this));
    this.dispatcher.on('updateUsers', this.updateUsers.bind(this));
    this.dispatcher.on('fetchingUsers', this.fetchingUsers.bind(this));
  }

  includeUserKind(userKind: UserKind): void {
    if (!this.state.includeUserKinds.includes(userKind)) {
      this.state.includeUserKinds.push(userKind);
      this.emit('change');
    }
  }

  excludeUserKind(userKind: UserKind): void {
    if (this.state.includeUserKinds.includes(userKind)) {
      const index = this.state.includeUserKinds.indexOf(userKind);
      this.state.includeUserKinds.splice(index, 1);
      this.emit('change');
    }
  }

  changeWaitingNumber(num: number): void {
    this.state.waitingNumber = num;
    this.emit('change');
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

  get includeUserKinds(): UserKind[] {
    return this.state.includeUserKinds;
  }

  get waitingNumber(): number {
    return this.state.waitingNumber;
  }

  get fetching(): boolean {
      return this.state.fetching;
  }
}

export const STORE_TOKEN = new OpaqueToken('store');
export function storeFactory(dispatcher: EventEmitter) { return new Store(dispatcher); }
