import { Component }  from '@angular/core';
import { OnInit }     from '@angular/core';

import * as Bluebird  from 'bluebird';

import { PrologService }  from '../../services/prolog/prolog.service';
import { EventService }   from '../../services/events/event.service';
import { Player }         from '../../lib/player.interface';
import { AIPlayer }       from '../../lib/ai-player';
import { HumanPlayer }    from '../../lib/human-player';

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
  constructor(
  	private prologService: PrologService,
  	private eventService: EventService
  ) {
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

	/**
	 * This is just a test for the moment.
	 */
	public game(): Bluebird<void> {
    let player1 = new AIPlayer(-1, this.prologService, 0);
    let player2 = new HumanPlayer(1, this.prologService, this.eventService);
    let currentPlayer: Player = player2;
    let waitingPlayer: Player = player1;

    let endOfGame = false;
    return this
	    .promiseLoop(
	    	() => {
	        return !endOfGame;
		    },
		    () => {
					return this.prologService
						.canPlayerPlay(this.board, currentPlayer)
						.then((playable: boolean) => {
							if(playable) {
								return currentPlayer
									.play(this.board)
									.then((board) => {
										this.board = board;
										let temp = currentPlayer;
										currentPlayer = waitingPlayer;
										waitingPlayer = temp;
									});
							} else {
								return this.prologService
									.canPlayerPlay(this.board, waitingPlayer)
									.then((playable2: boolean) => {
										if(!playable2) {
											endOfGame = true;
										}
									})
							}
						});
		    })
	    .then(() => {
    	  console.log("End of the game!");
	    });

    /*return player1
      .play(this.board)
	    .then((board) => {
	      this.board = board;
	      return;
	    })
	    .then(() => {
        this.clickable = true;
				return;
	    })
	    .then(() => {
    	  return player2.play(this.board);
	    })
	    .then((board) => {
    	  this.board = board;
    	  return;
	    })
	    .then(() => {
    	  console.log("here!");
    	  let i = 0;
    	  return this.promiseLoop(() => {
    	  	return i <= 10;
	      }, () => {
    	  	return Bluebird.delay(250).then(() => {
			      console.log("i'm calling that");
			      console.log(i++);
		      });
	      }).then(() => {
    	  	console.log("done!");
    	  	return;
	      })
	    });*/
  }

  protected clickCase(x: number, y: number): void {
		this.eventService.emit("case-clicked", {x: x, y: y}, true);
		if(this.clickable) {
			console.log(`clicked! (${x}, ${y})`);
		} else {
			console.log("This is not supposed to be clickable right now.");
		}
  }

  protected clickable: boolean = false;

	public setClickable(clickable: boolean): void {
		this.clickable = clickable;
	}

	protected promiseLoop(condition: (params?: any) => boolean, action: (params?: any) => Bluebird<any>) {
		let loop = () => {
			if(!condition()) {
				return;
			}
			return action().then(loop);
		};
		return Bluebird.resolve().then(loop);
	}
}