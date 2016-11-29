import * as Bluebird  from 'bluebird';

import { Piece }      from './piece.enum';

export interface Player {

  /**
   * Plays a valid move on the given board,
   * and returns the updated board when done.
   */
  play(board: number[][]): Bluebird<number[][]>;
  
  /**
   * Return the pieces' color the player is playing with.
   */
  getPieceColor(): Piece;
}