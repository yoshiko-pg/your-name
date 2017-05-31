import { EventInfo, User } from '../core/interfaces';
import { EventSource, HttpGet } from './event-source';
import { Users } from '../core/constants';

export class MeetupEventSource implements EventSource {

  /* @internal */
  _dom: Document;

  load(eventSourceUrl: string, delegate: HttpGet) {
    const query = `select * from html where url='${eventSourceUrl}'`;
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
    const liItems = Array.from(this._dom.querySelectorAll('li[data-memberid]')) as HTMLLIElement[];
    const participantList = liItems.map((liItem, index) => {
      const name = liItem.querySelector('.member-name').textContent.trim();
      const avatar = liItem.querySelector('a.mem-photo-small').getAttribute('data-src');
      return { name, avatar, index } as User;
    });
    users.participant = participantList;
    return users;
  }

  extractEventInfo(): EventInfo {
    if (!this._dom) {
      throw new Error('Can\'t extract information until DOM fetched!');
    }
    const titleFragments = (this._dom.title || 'unknown name').split(' - ');
    const eventName = this._dom.querySelector('.text--display3');
    return {
      name: titleFragments.slice(0, titleFragments.length - 1).join(' - '),
      image: '',
    };
  }
}
