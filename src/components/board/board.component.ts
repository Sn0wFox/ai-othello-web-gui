import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';

import * as Bluebird  from 'bluebird';

import { PrologService }  from '../../services/prolog/prolog.service';
import { AIPlayer }       from '../../objects/ai-player';

@Component({
  moduleId: module.id,
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: [
    './board.component.css'
  ]
})
export class BoardComponent implements OnInit {

  /**
   * The real current state of the board.
   */
  protected board: number[][] = [];
  
  /**
   * Instantiates an object,
   * and instantiates private services.
   */
  constructor(private prologService: PrologService) {
    // Nothing else to do
  }
  
  /**
   * Initialize the object properly:
   * initialize the board.
   */
  public ngOnInit(): Bluebird<void> {
    return this.prologService
      .getInitialBoard()
      .then((board) => {
        this.board = board;
        this.game();
        return;
      });
  }
  
  public game(): Bluebird<void> {
    let player1 = new AIPlayer(-1, this.prologService, 0);
    return player1.play(this.board).then((board) => {
      this.board = board;
      return;
    })
  }
  
}