/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DesignChangerComponent } from './design-changer.component';

describe('DesignChangerComponent', () => {
  let component: DesignChangerComponent;
  let fixture: ComponentFixture<DesignChangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignChangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignChangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
