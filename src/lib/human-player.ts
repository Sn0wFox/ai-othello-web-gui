import * as Bluebird      from 'bluebird';

import { AbstractPlayer } from './player.abstract';
import { Piece }          from './piece.enum';

import { PrologService }  from '../services/prolog/prolog.service';
import { EventService }   from '../services/events/event.service';

export class HumanPlayer extends AbstractPlayer {

	/**
	 * The service allowing to handle events.
	 */
	protected eventService: EventService;

  /**
   * Plays a valid move on the given board,
   * and returns the updated board when done.
   */
  public play(board: number[][]): Bluebird<number[][]> {
  	let move: {x: number, y: number};
		return this
			.waitForEvent("case-clicked")
			.then((coord: {x: number, y: number}) => {
				move = coord;
				console.log(`The player tried to play in (${coord.x}, ${coord.y})`);
			})
			.then(() => {
				return this.prologService.isValideMove(board, this, move.x, move.y);
			})
			.then((playable: boolean) => {
				if(playable) {
					return this.prologService.updateBoard(board, this, move.x, move.y)
				}
				return this.play(board);
			});
  }
  
  /**
   * Instantiates a human player.
   */
  public constructor(
  	pieceColor: Piece,
	  prologService: PrologService,
	  eventService: EventService
  ) {
    super(pieceColor, prologService);
    this.eventService = eventService;
  }

	/**
	 * Promisifies the given event.
	 * Once the event will be fired, the called callback will be the function
	 * passed in the "then()" function following the call of this method.
	 */
  protected waitForEvent(type: string): Bluebird<any> {
  	return new Bluebird((resolve, reject) => {
  		this.eventService.once(type, resolve);
	  });
  }
}