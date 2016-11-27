import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'othello-app',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  protected name: string = "Othello App";
}