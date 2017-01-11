import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../core/interfaces';
import { USER_KINDS, Users } from '../core/constants';

@Injectable()
export class ParticipationService {

  constructor(private http: Jsonp) { }

  fetch(url: string): Observable<Users> {
    const query = `select * from html where url='${url.replace(/\/$/, '')}/participation/'`;
    const fullUrl = `https://query.yahooapis.com/v1/public/yql?callback=JSONP_CALLBACK&q=${encodeURIComponent(query)}`;

    return this.http.get(fullUrl).map(this.extractUsers);
  }

  extractUsers(res: Response): Users {
    const parser = new DOMParser();
    const htmlString = res.json().results[0];
    const doc = parser.parseFromString(htmlString, 'text/html');
    const users: Users = {};

    USER_KINDS.forEach((USER_KIND) => {
      users[USER_KIND.KEY] = USER_KIND.CONTAINER_SELECTORS
      .map((SELECTOR) => {
        return Array.from(doc.querySelectorAll(`${SELECTOR} .image_link img`));
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
      ;
    });

    return users;
  }
}
