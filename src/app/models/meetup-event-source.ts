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
    const liItems = Array.from(this._dom.querySelectorAll('li[data-memberid]')) as HTMLLIElement[];
    const records = liItems.map(liItem => {
      const name = liItem.querySelector('.member-name').textContent.trim();
      const avatar = liItem.querySelector('a.mem-photo-small').getAttribute('data-src');
      const hasRole = !!liItem.querySelector('.event-role');
      return { user: { name, avatar, index: 0 } as User, hasRole };
    });
    const admin = records.filter(r => r.hasRole).map((r, i) => ({ ...r.user, index: i }));
    const participant = records.filter(r => !r.hasRole).map((r, i) => ({ ...r.user, index: i + admin.length }));
    const waiting: User[] = []; // FIXME...
    return { admin, participant, waiting };
  }

  extractEventInfo(): EventInfo {
    if (!this._dom) {
      throw new Error('Can\'t extract information until DOM fetched!');
    }
    const eventName = this._dom.querySelector('.text--display3') || this._dom.querySelector('.text--display2');
    return {
      name: eventName ? eventName.textContent : '',
      image: '',
    };
  }
}
