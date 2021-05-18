import {Observable} from "rxjs";
import {Store} from '@ngrx/store';
import {Component} from '@angular/core'
import {WidgetsService} from './../common/services/widgets.service';
import {AppStore} from "../common/models/appstore.model";
import {Widget} from "../common/models/widget.model";

@Component({
  selector: 'widgets',
  template: `
    <div class="mdl-grid items">
      <div class="mdl-cell mdl-cell--6-col">
        <widgets-list [widgets]="widgets"
        (selected)="selectWidget($event)"></widgets-list>
      </div>
      <div class="mdl-cell mdl-cell--6-col">
        <widget-details (saved)="saveWidget($event)" (cancelled)="resetWidget()"
        [widget]="selectedWidget | async"></widget-details>
      </div>
    </div>
  `,
  styles: [`
    .widgets {
      padding: 20px;
    }
  `]
})
export class WidgetsComponent {
  widgets = [];
  selectedWidget: Observable<Widget|any>;

  constructor(private _widgetsService: WidgetsService,
    private _store: Store<AppStore>) {
    this.selectedWidget = _store.select('selectedWidget');

    _widgetsService.loadWidgets()
      .subscribe(
        widgets => this.widgets = widgets,
        error => console.error(error.json())
      );
  }

  resetWidget() {
    let emptyWidget: Widget = {id: null, name: '', price: 0};
    this._store.dispatch({type: 'SELECT_WIDGET', payload: emptyWidget});
  }

  selectWidget(widget) {
    this._store.dispatch({type: 'SELECT_WIDGET', payload: widget});
  }

  saveWidget(widget) {
    console.log('widget', widget);
  }
}
