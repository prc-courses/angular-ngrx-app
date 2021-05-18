import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';

import {AppStore} from '../models/appstore.model';
import {Item} from '../models/item.model';

const BASE_URL = 'http://localhost:3000/items/';
const HEADER = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class ItemsService {
  items: Observable<Array<Item>|any>;

  constructor(private http: HttpClient, private store: Store<AppStore>) {
    this.items = store.select('items');
  }

  loadItems() {
    this.http.get<Item[]>(BASE_URL)
      .pipe(map(payload => ({ type: 'ADD_ITEMS', payload })))
      .subscribe(action => this.store.dispatch(action));
  }

  saveItem(item: Item) {
    (item.id) ? this.updateItem(item) : this.createItem(item);
  }

  createItem(item: Item) {
    this.http.post<Item>(`${BASE_URL}`, item, HEADER)
      .pipe(map(payload => ({ type: 'CREATE_ITEM', payload })))
      .subscribe(action => this.store.dispatch(action));
  }

  updateItem(item: Item) {
    this.http.put<Item>(`${BASE_URL}${item.id}`, item, HEADER)
      .subscribe(res => this.store.dispatch({ type: 'UPDATE_ITEM', payload: item }));
  }

  deleteItem(item: Item) {
    this.http.delete<Item>(`${BASE_URL}${item.id}`)
      .subscribe(res => this.store.dispatch({ type: 'DELETE_ITEM', payload: item }));
  }
}
