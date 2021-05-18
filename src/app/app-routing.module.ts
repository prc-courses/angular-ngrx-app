import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent} from './items/items.component';
import { WidgetsComponent } from './widgets/widgets.component';

const routes: Routes = [
  { path: '',            component: ItemsComponent },
  { path: 'items',       component: ItemsComponent },
  { path: 'widgets',     component: WidgetsComponent },
  { path: '*',           component: ItemsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
