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
		return this
			.waitForEvent("case-clicked")
			.then((coord: {x: number, y: number}) => {
				console.log(`The player tried to play in (${coord.x}, ${coord.y})`);
			})
			.then(() => {
				// Return a mock array to see if everything works as expected
				return [
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
					[0, 0, 0, 0, 1,-1, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				];
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