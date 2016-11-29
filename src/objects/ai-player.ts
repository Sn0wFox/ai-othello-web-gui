import * as Bluebird      from 'bluebird';

import { AbstractPlayer } from './player.abstract';
import { Piece }          from './piece.enum';
import { AILevel }        from './ai-level.enum';
import { PrologService }  from '../services/prolog/prolog.service';

export class AIPlayer extends AbstractPlayer {

  /**
   * The AI's level.
   */
  protected level: AILevel;

  /**
   * Plays a valid move on the given board,
   * and returns the updated board when done.
   */
  public play(board: number[][]): Bluebird<number[][]> {
    return Bluebird.reject(new Error("This function is not implemented yet."));
  }
  
  /**
   * Instantiate an AI player.
   */
  public constructor(pieceColor: Piece, prologService: PrologService, level: AILevel) {
    super(pieceColor, prologService);
    this.level = level;
  }
}