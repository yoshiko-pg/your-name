import { Injectable, Inject } from '@angular/core';

import { EventEmitter, PRIMARY_EVENT_EMITTER } from './event-emitter';
import { Users } from './constants';
import { USER_KINDS, UserKind } from './constants';
import { EventInfo } from './interfaces';

interface State {
  users: Users;
  eventInfo: EventInfo;
  includeUserKinds: UserKind[];
  waitingNumber: number;
  fetching: boolean;
}

@Injectable()
export class Store extends EventEmitter {
  private state: State = {
    users: [],
    eventInfo: {name: '', image: ''},
    includeUserKinds: USER_KINDS.filter((k) => k.KEY === 'participant'),
    waitingNumber: 10,
    fetching: false,
  };

  constructor(@Inject(PRIMARY_EVENT_EMITTER) private dispatcher: EventEmitter) {
    super();
    this.dispatcher.on('includeUserKind', this.includeUserKind.bind(this));
    this.dispatcher.on('excludeUserKind', this.excludeUserKind.bind(this));
    this.dispatcher.on('changeWaitingNumber', this.changeWaitingNumber.bind(this));
    this.dispatcher.on('updateUsers', this.updateUsers.bind(this));
    this.dispatcher.on('updateEventInfo', this.updateEventInfo.bind(this));
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

  updateEventInfo(info: EventInfo): void {
    this.state.eventInfo = info;
    this.emit('change');
  }

  updateUsers(users: Users): void {
    this.state.users = users;
    this.emit('change');
  }

  fetchingUsers(status: boolean): void {
    this.state.fetching = status;
    this.emit('change');
  }

  get eventInfo(): EventInfo {
    return this.state.eventInfo;
  }

  get users(): Users {
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
