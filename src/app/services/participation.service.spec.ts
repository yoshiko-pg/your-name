/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParticipationService } from './participation.service';

describe('ParticipationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParticipationService]
    });
  });

  it('should ...', inject([ParticipationService], (service: ParticipationService) => {
    expect(service).toBeTruthy();
  }));
});
