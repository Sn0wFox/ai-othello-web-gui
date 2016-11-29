import * as Bluebird      from 'bluebird';

import { Player }         from './player.interface';
import { Piece }          from './piece.enum';

import { PrologService }  from '../services/prolog/prolog.service';

export abstract class AbstractPlayer implements Player {

  /**
   * The tokens' color the player is playing with.
   */
  protected pieceColor: Piece;
  
  /**
   * The service allowing to contact the Prolog server.
   */
  protected prologService: PrologService;

  /**
   * Plays a valid move on the given board,
   * and returns the updated board when done.
   */
  public abstract play(board: number[][]): Bluebird<number[][]>;
  
  /**
   * Return the pieces' color the player is playing with.
   */
  public getPieceColor(): Piece {
    return this.pieceColor;
  }
  
  /**
   * Instanciates common attributes.
   */
  public constructor(pieceColor: Piece, prologService: PrologService) {
    this.pieceColor = pieceColor;
    this.prologService = prologService;
  }
}