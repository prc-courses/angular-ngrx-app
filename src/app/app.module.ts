import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent} from './items/items.component';
import { ItemsListComponent } from './items/items-list.component';
import { ItemDetailComponent } from './items/item-detail.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsListComponent } from './widgets/widgets-list.component';
import { WidgetDetailComponent } from './widgets/widget-detail.component';
import { ItemsService } from './common/services/items.service';
import { WidgetsService } from './common/services/widgets.service';

import { items } from './common/stores/items.store';
import { selectedItem } from './common/stores/selectedItem.store';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemsListComponent,
    ItemDetailComponent,
    WidgetsComponent,
    WidgetsListComponent,
    WidgetDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({items, selectedItem}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [
    ItemsService,
    WidgetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
