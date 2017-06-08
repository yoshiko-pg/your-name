import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Users } from '../core/constants';
import { EventInfo } from '../core/interfaces';
import { environment } from '../../environments/environment';

export type HttpGet = Http['get'];

export abstract class EventSource {
  protected _dom: Document;

  load(eventSourceUrl: string, delegate: HttpGet) {
    const fullUrl = `${environment.apiEndpoint}/api/fetch?url=${encodeURIComponent(eventSourceUrl)}`;
    return delegate(fullUrl)
      .map(res => new DOMParser().parseFromString(res.json().html, 'text/html'))
      .do(dom => this._dom = dom)
    ;
  }

  abstract extractUsers(): Users;
  abstract extractEventInfo(): EventInfo;
}
