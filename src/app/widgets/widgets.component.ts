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
        [widget]="selectedWidget"></widget-details>
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
  selectedWidget: Widget;

  static emptyWidget: Widget = {id: null, name: '', price: 0};

  constructor(private _widgetsService: WidgetsService,
    private _store: Store<AppStore>) {
    this.selectedWidget = WidgetsComponent.emptyWidget;

    _widgetsService.loadWidgets()
      .then(
        widgets => this.widgets = widgets,
        error => console.error(error.json())
      );
  }

  resetWidget() {
    this.selectedWidget = WidgetsComponent.emptyWidget;
  }

  selectWidget(widget) {
    this.selectedWidget = widget;
  }

  saveWidget(widget) {
    console.log('widget', widget);
  }
}
