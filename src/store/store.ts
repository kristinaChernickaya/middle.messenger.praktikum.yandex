export enum StoreEvents {
  Updated = 'updated',
}

import { set } from '../utils';
import { StoreType } from '../types';
import EventBus from '../services/eventBus';

export class Store extends EventBus<any> {
  private state: StoreType = {
    errorMessage: '',
    user: {
      id: null,
      first_name: 'ss',
      second_name: '',
      display_name: null,
      login: '',
      avatar: null,
      email: '',
      phone: '',
    },
  };

  public getState() {
    return this.state;
  }

  public setState(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated, this.getState());
  }
}

export const store = new Store();
