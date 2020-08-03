export class InitState {
  static readonly type = '[Store] Init State';
  constructor(public data: string[]) {}
}

export class AddItem {
  static readonly type = '[Items] Add Item';
  constructor(public name: string) {}
}

export class RemoveItem {
  static readonly type = '[Items] Remove Item';
  constructor(public id: number) {}
}
