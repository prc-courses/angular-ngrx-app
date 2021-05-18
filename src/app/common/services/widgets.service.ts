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
    return this.http.post<Widget>(BASE_URL, widget, HEADER).toPromise()
      .then(data => {
        this.widgets.push(data);
        return data;
      });
  }

  remove(widget: Widget){
    return this.http.delete<Widget>(`${BASE_URL}?id=${widget.id}`).toPromise()
      .then(removed => {
        const index = this.widgets.indexOf(removed);
        this.widgets.splice(index, 1);
      });
  }

  update(widget: Widget, update: Widget){
    return this.http.put<Widget>(`${BASE_URL}?id=${widget.id}`, update, HEADER).toPromise()
      .then(updated => {
        const index = this.widgets.indexOf(widget);
        this.widgets[index] = updated;
      });
  }

  loadWidgets() {
    return this.http.get<Widget[]>(BASE_URL).toPromise()
      .then(json => this.widgets = json);
    }
}
