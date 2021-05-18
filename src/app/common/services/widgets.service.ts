import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Widget } from "../models/widget.model";

const BASE_URL = 'http://localhost:3000/widgets/';
const HEADER = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class WidgetsService {
  widgets: Widget[] = [];

  constructor(private http: HttpClient) {}

  add(widget: Widget){
    // this.widgets = [...this.widgets, widget];
    return this.http.post<Widget>(BASE_URL, widget, HEADER)
    .pipe(tap(data => {
      this.widgets = [...this.widgets, data];
      return data;
    }));
  }

  remove(widget: Widget){
    return this.http.delete<Widget>(`${BASE_URL}?id=${widget.id}`)
    .pipe(tap(removed => {
      this.widgets = this.widgets.filter(
        (currentWidget) => currentWidget.id !== removed.id
      );
    }));
  }

  update(widget: Widget, update: Widget){
    return this.http.put<Widget>(`${BASE_URL}?id=${widget.id}`, update, HEADER)
    .pipe(tap(updated => {
      const index = this.widgets.indexOf(updated);
      this.widgets = [
        ...this.widgets.slice(0, index),
        updated,
        ...this.widgets.slice(index + 1)
      ]
    }));
  }

  loadWidgets() {
    return this.http.get<Widget[]>(BASE_URL)
      .pipe(tap(json => this.widgets = [...this.widgets, ...json]));
    }
}
