import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Users } from '../core/constants';
import { EventInfo } from '../core/interfaces';

export type HttpGet = Http['get'];

export interface EventSource {
  load(url: string, delegate: HttpGet): Observable<any>;
  extractUsers(): Users;
  extractEventInfo(): EventInfo;
}
