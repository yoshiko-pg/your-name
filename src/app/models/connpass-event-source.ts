import { EventSource, HttpGet } from './event-source';
import { Users, USER_KINDS } from '../core/constants';
import { EventInfo, User } from '../core/interfaces';

export class ConnpassEventSource implements EventSource {
  /* @internal */
  _dom: Document;

  load(eventSourceUrl: string, delegate: HttpGet) {
    const query = `select * from html where url='${eventSourceUrl.replace(/\/$/, '')}/participation/'`;
    const fullUrl = `https://query.yahooapis.com/v1/public/yql?callback=JSONP_CALLBACK&q=${encodeURIComponent(query)}`;
    return delegate(fullUrl)
      .map(res => new DOMParser().parseFromString(res.json().results[0], 'text/html'))
      .do(dom => this._dom = dom)
    ;
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

