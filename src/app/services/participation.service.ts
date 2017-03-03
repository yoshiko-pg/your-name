import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User, EventInfo } from '../core/interfaces';
import { USER_KINDS, Users } from '../core/constants';

@Injectable()
export class ParticipationService {

  constructor(private http: Jsonp) { }

  fetchDom(url: string): Observable<Document> {
    const query = `select * from html where url='${url.replace(/\/$/, '')}/participation/'`;
    const fullUrl = `https://query.yahooapis.com/v1/public/yql?callback=JSONP_CALLBACK&q=${encodeURIComponent(query)}`;

    return this.http.get(fullUrl).map(this.parseDom);
  }

  parseDom(res: Response): Document {
    const parser = new DOMParser();
    const htmlString = res.json().results[0];

    return parser.parseFromString(htmlString, 'text/html');
  }

  extractUsers(dom: Document): Users {
    const users: Users = {};

    USER_KINDS.forEach((USER_KIND) => {
      users[USER_KIND.KEY] = USER_KIND.CONTAINER_SELECTORS
      .map((SELECTOR) => {
        return Array.from(dom.querySelectorAll(`${SELECTOR} .image_link img`));
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

  extractEventInfo(dom: Document): EventInfo {
    const eventImage = <HTMLImageElement>dom.querySelector('.title_with_thumb img');
    const eventName = dom.querySelector('.event_title');

    return {
      name: eventName.textContent,
      image: eventImage.src,
    };
  }
}
