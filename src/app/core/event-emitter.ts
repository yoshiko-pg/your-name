import { Injectable, OpaqueToken } from '@angular/core';

@Injectable()
export class EventEmitter {
  private handlers = {};

  on(type: string, callback): void {
    this.handlers[type] = this.handlers[type] || [];
    this.handlers[type].push(callback);
  }

  off(type: string, callback): void {
    if ((this.handlers[type] || []).includes(callback)) {
      const index = this.handlers[type].indexOf(callback);

      this.handlers[type].splice(index, 1);
    }
  }

  emit(type: string, data?: any): void {
    (this.handlers[type] || []).forEach((callback) => {
      callback(data);
    });
  }
}

export const PRIMARY_EVENT_EMITTER = new OpaqueToken('primaryEventEmitter');
