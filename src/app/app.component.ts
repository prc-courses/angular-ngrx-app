import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'rest-app';

  links = {
    items: ['/items'],
    widgets: ['/widgets']
  }
}
