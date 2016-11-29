import * as Bluebird      from 'bluebird';

import { AbstractPlayer } from './player.abstract';
import { Piece }          from './piece.enum';

import { PrologService }  from '../services/prolog/prolog.service';

export class HumanPlayer extends AbstractPlayer {

  /**
   * Plays a valid move on the given board,
   * and returns the updated board when done.
   */
  public play(board: number[][]): Bluebird<number[][]> {
    return Bluebird.reject(new Error("This function is not implemented yet."));
  }
  
  /**
   * Instantiate a human player.
   */
  public constructor(pieceColor: Piece, prologService: PrologService) {
    super(pieceColor, prologService);
  }
}