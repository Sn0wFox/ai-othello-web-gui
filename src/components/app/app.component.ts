import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'othello-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  protected name: string = "Othello App";
}