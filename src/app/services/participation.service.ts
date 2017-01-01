import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class ParticipationService {

  constructor(private http: Http) { }

  getMember(url: string): Observable<Object> {
    const query: string = `select * from html where url="${url}"`;
    const fullUrl: string = `https://query.yahooapis.com/v1/public/yql?format=json&q=${encodeURIComponent(query)}`;

    return this.http.get(fullUrl).map(this.extractData);
  }

  extractData(res: Response) {
    console.log(res);
    return res.json().query.results.body;
  }
}
