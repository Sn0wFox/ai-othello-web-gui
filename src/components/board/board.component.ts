import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: [
    './board.component.css'
  ]
})
export class BoardComponent {
  protected name: string = "Board";
}