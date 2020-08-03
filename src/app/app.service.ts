import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Store } from '@ngxs/store';
import { InitState } from './store/items.actions';

@Injectable()
export class AppService {

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  loadData(): void {
    this.http.get<any>('assets/data.json').subscribe(data => this.store.dispatch(new InitState(data.items)));
    // this.store.dispatch(new InitState(['1', '55', 'hi alex']));
  }

}
