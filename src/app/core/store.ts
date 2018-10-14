import { Injectable, Inject } from '@angular/core';

import { EventEmitter, PRIMARY_EVENT_EMITTER } from './event-emitter';
import { Users, USER_KINDS, UserKind, Preset, PRESETS, EventSourceKind } from './constants';
import { EventInfo } from './interfaces';

interface State {
  url: string;
  eventSourceKind?: EventSourceKind;
  isValidSource: boolean;
  users: Users;
  eventInfo: EventInfo;
  includeUserKinds: UserKind[];
  waitingNumber: number;
  fetching: boolean;
  preset: Preset;
  customBgUrl: string;
}

@Injectable()
export class Store extends EventEmitter {
  private state: State = {
    url: '',
    eventSourceKind: null,
    isValidSource: false,
    users: [],
    eventInfo: { name: '', image: '' },
    includeUserKinds: USER_KINDS.filter((k) => k.KEY === 'participant'),
    waitingNumber: 10,
    fetching: false,
    preset: PRESETS[0],
    customBgUrl: null,
  };

  constructor(@Inject(PRIMARY_EVENT_EMITTER) private dispatcher: EventEmitter) {
    super();
    this.dispatcher.on('changeUrl', this.changeUrl.bind(this));
    this.dispatcher.on('includeUserKind', this.includeUserKind.bind(this));
    this.dispatcher.on('excludeUserKind', this.excludeUserKind.bind(this));
    this.dispatcher.on('changeWaitingNumber', this.changeWaitingNumber.bind(this));
    this.dispatcher.on('updateUsers', this.updateUsers.bind(this));
    this.dispatcher.on('updateEventInfo', this.updateEventInfo.bind(this));
    this.dispatcher.on('fetchingUsers', this.fetchingUsers.bind(this));
    this.dispatcher.on('changePreset', this.changePreset.bind(this));
    this.dispatcher.on('uploadCustomBg', this.uploadCustomBg.bind(this));
  }

  changeUrl(url: string): void {
    if (this.state.url !== url) {
      if (/^https:\/\/(.+?\.)?connpass\.com\/event\/\d{1,9}\/?$/.test(url)) {
        this.state.eventSourceKind = 'connpass';
        this.state.isValidSource = true;
      } else if (/^https:\/\/(.+?\.)?meetup\.com\/.*\/events\/\d+\/?$/.test(url)) {
        this.state.eventSourceKind = 'meetup';
        this.state.isValidSource = true;
      } else {
        this.state.eventSourceKind = null;
        this.state.isValidSource = false;
      }
      this.state.url = url;
      this.emit('change');
    }
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

  changePreset(preset: Preset): void {
    this.state.preset = preset;
    this.emit('change');
  }

  uploadCustomBg(url: string): void {
    this.state.customBgUrl = url;
    this.state.preset = this.customPreset;
    this.emit('change');
  }

  get url(): string {
    return this.state.url;
  }

  get eventSourceKind(): EventSourceKind {
    return this.state.eventSourceKind;
  }

  get isValidSource(): boolean {
    return this.state.isValidSource;
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

  get customBgUrl(): string {
    return this.state.customBgUrl;
  }

  get preset(): Preset {
    return this.state.preset;
  }

  get customPreset(): Preset {
    return PRESETS.find((p) => p.custom);
  }
}

