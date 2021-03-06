import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AddItem, RemoveItem } from './store/items.actions';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ItemsState, ItemsStateModel } from './store/items.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  // @Select(ItemsState.items) items$: Observable<ItemsStateModel[]>;

  @ViewChild('itemInput') itemInput: ElementRef;

  modalRef: BsModalRef;
  modalOpenedIndex: number;

  items$: Observable<ItemsStateModel[]>;
  items: ItemsStateModel[] = [];

  constructor(
    private store: Store,
    private modalService: BsModalService
  ) {
    this.items$ = this.store.select(state => state.items.items);
  }

  ngOnInit(): void {
    this.items$.subscribe(item => {
      this.items = item;
    });
  }

  addItem(): void {
    const name: string = this.itemInput.nativeElement.value;
    this.store.dispatch(new AddItem(name));
    this.itemInput.nativeElement.value = '';
  }


  removeItem(id: number): void {
    this.store.dispatch(new RemoveItem(id));
  }


  openModal(template: TemplateRef<any>, i: number): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.modalOpenedIndex = i;
  }

  confirm(): void {
    this.removeItem(this.modalOpenedIndex);
    this.modalOpenedIndex = null;
    this.modalRef.hide();
  }

  decline(): void {
    this.modalOpenedIndex = null;
    this.modalRef.hide();
  }


}
