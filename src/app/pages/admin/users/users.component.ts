import {
  Component,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routerTransition } from '../../route-animation';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  animations: [ routerTransition ]
})
export class UsersComponent implements OnInit {
  constructor() {}
  ngOnInit() {}

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
