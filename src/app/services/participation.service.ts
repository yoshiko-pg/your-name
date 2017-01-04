import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../core/interfaces';

@Injectable()
export class ParticipationService {

  constructor(private http: Jsonp) { }

  fetch(url: string): Observable<User[]> {
    const query = `select * from html where url='${url.replace(/\/$/, '')}/participation/'`;
    const fullUrl = `https://query.yahooapis.com/v1/public/yql?callback=JSONP_CALLBACK&q=${encodeURIComponent(query)}`;

    return this.http.get(fullUrl).map(this.extractUsers);
  }

  extractUsers(res: Response): User[] {
    const parser = new DOMParser();
    const htmlString = res.json().results[0];
    const doc = parser.parseFromString(htmlString, 'text/html');
    const images = doc.querySelectorAll('.participation_table_area .image_link img');
    const users = Array.from(images).map((image: HTMLImageElement, index: number): User => {
      return {
        avatar: image.src,
        name: image.alt,
        index,
      };
    });

    return users;
  }
}
