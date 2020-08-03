import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { InitState, AddItem, RemoveItem } from './items.actions';

import { Observable } from 'rxjs';

export interface ItemsStateModel {
  items: string[];
}

@State<ItemsStateModel>({
  name: 'items',
  defaults: {
    // items: ['a', 'b', 'c', 'd', 'e', 'f']
    items: []
  }
})
@Injectable()
export class ItemsState {

  // @Select(state => state.items) animals$: Observable<ItemsStateModel[]>;

  @Action(InitState)
  initState(ctx: StateContext<ItemsStateModel>, action): void {
    const state = ctx.getState();
    console.log('initState', action);
    ctx.patchState({
      items: [
        ...action.data
      ]
    });
  }

  @Action(AddItem)
  addItem(ctx: StateContext<ItemsStateModel>, action): void {
    const state = ctx.getState();
    console.log('add', action);
    ctx.patchState({
      items: [
        ...state.items,
        action.name,
      ]
    });
  }

  @Action(RemoveItem)
  removeItem(ctx: StateContext<ItemsStateModel>, action): void {
    const state = ctx.getState();
    console.log('remove', action);
    ctx.patchState({
      items: [
        ...state.items.filter((item, i) => i !== action.id),
      ]
    });
  }
}
