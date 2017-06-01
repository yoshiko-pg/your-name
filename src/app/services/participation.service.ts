import { Injectable } from '@angular/core';
import { Jsonp, Response, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { User, EventInfo } from '../core/interfaces';
import { USER_KINDS, EventSourceKind, Users } from '../core/constants';
import { EventSource } from '../models/event-source';
import { ConnpassEventSource } from '../models/connpass-event-source';
import { MeetupEventSource } from '../models/meetup-event-source';

@Injectable()
export class ParticipationService {

  eventSource: EventSource;

  constructor(private http: Jsonp) { }

  fetch({ url, type }: { url: string; type: EventSourceKind }): Observable<Document> {
    switch (type) {
      case 'connpass':
        this.eventSource = new ConnpassEventSource();
        break;
      case 'meetup':
        this.eventSource = new MeetupEventSource();
        break;
    }
    return this.eventSource.load(url, this.http.get.bind(this.http));
  }

  extractUsers(): Users {
    return this.eventSource.extractUsers();
  }

  extractEventInfo(): EventInfo {
    return this.eventSource.extractEventInfo();
  }
}
