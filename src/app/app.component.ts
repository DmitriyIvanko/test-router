import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { slideInAnimation } from './animation';

@Component({
  animations: [ slideInAnimation ],
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'test-router';

  getAnimationData(outlet: RouterOutlet) {
    debugger;
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
