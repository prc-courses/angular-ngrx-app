import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Widget} from "./../common/models/widget.model";

@Component({
    selector: 'widget-details',
    template: `
  <div class="fem-card mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text" *ngIf="selectedWidget.id">Editing {{originalName}}</h2>
      <h2 class="mdl-card__title-text" *ngIf="!selectedWidget.id">Create New Widget</h2>
    </div>
    <div class="mdl-card__supporting-text">
      <form [formGroup]="widgetForm"
          (submit)="saved.emit(selectedWidget)" novalidate>
          <div class="mdl-textfield mdl-js-textfield">
            <label>Widget Name</label>
            <input formControlName="name"
              name="name"
              placeholder="Enter a name"
              class="mdl-textfield__input" type="text">
          </div>

          <div class="mdl-textfield mdl-js-textfield">
            <label>Widget Price</label>
            <input formControlName="price"
              name="price"
              placeholder="Enter a price"
              class="mdl-textfield__input" type="text">
          </div>
          <button type="submit" (click)="cancelled.emit(selectedWidget)" class="mdl-button mdl-js-button mdl-js-ripple-effect">Cancel</button>
          <button type="submit" [disabled]="!widgetForm.valid" class="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">Save</button>
      </form>
    </div>
  </div>
   `,
  styles: [`
    .error { color: red; }
  `]
})
export class WidgetDetailComponent implements OnInit {
  originalName: string;
  selectedWidget: Widget;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  widgetForm: FormGroup;

  @Input() set widget(value: Widget){
    if (value) this.originalName = value.name;
    this.selectedWidget = Object.assign({}, value);
    // Update form
    if (this.widgetForm) this.widgetForm.setValue(this.selectedWidget);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.widgetForm = this.fb.group({
      id: '',
      name: [this.selectedWidget.name, Validators.required],
      price: [this.selectedWidget.price, Validators.required]
    });
  }
}
