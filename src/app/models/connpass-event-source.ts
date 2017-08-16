import { EventSource, HttpGet } from './event-source';
import { Users, USER_KINDS } from '../core/constants';
import { EventInfo, User } from '../core/interfaces';

export class ConnpassEventSource extends EventSource {
  load(eventSourceUrl: string, delegate: HttpGet) {
    return super.load(eventSourceUrl.replace(/\/$/, '') + '/participation', delegate);
  }

  extractUsers(): Users {
    if (!this._dom) {
      throw new Error('Can\'t extract information until DOM fetched!');
    }
    const users: Users = {
      admin: [],
      participant: [],
      waiting: [],
    };

    USER_KINDS.forEach((USER_KIND) => {
      users[USER_KIND.KEY] = USER_KIND.CONTAINER_SELECTORS
      .map((SELECTOR) => {
        return Array.from(this._dom.querySelectorAll(`${SELECTOR} .image_link img`));
      })
      .reduce((sum, current) => {
        return sum.concat(current);
      }, [])
      .map((image: HTMLImageElement): User => {
        return {
          avatar: image.src,
          name: image.alt,
          index: 0,
          frame: '参加枠1', // TODO: あとで差し替える
        };
      })
      .filter((user: User) => {
        return !/退会ユーザー/.test(user.name);
      })
      ;
    });

    return users;
  }

  extractEventInfo(): EventInfo {
    if (!this._dom) {
      throw new Error('Can\'t extract information until DOM fetched!');
    }
    const eventImage = <HTMLImageElement>this._dom.querySelector('.title_with_thumb img');
    const eventName = this._dom.querySelector('.event_title');

    return {
      name: eventName.textContent,
      image: eventImage.src,
    };
  }
}
