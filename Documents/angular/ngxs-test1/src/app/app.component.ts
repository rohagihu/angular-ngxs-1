import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddItem, RemoveItem } from './store/items.actions';
import { Observable } from 'rxjs';

import { ItemsState, ItemsStateModel } from './store/items.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [ItemsState]
})


export class AppComponent implements OnInit {
  // @Select(ItemsState.items) items$: Observable<ItemsStateModel[]>;

  items$: Observable<ItemsStateModel[]>;
  items: ItemsStateModel[] = []

  constructor(private store: Store) {
    this.items$ = this.store.select(state => state.items.items);
  }

  ngOnInit(): void {
    this.items$.subscribe(item => {
      this.items = item;
      console.log(item);
    });
  }



  addItem(name: string): void {
    console.log(name);
    this.store.dispatch(new AddItem(name));
  }

  removeItem(id: number): void {
    console.log(id);
    this.store.dispatch(new RemoveItem(id));
  }
}
