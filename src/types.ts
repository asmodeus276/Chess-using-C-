export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type PieceColor = 'w' | 'b';

export interface Piece {
  type: PieceType;
  color: PieceColor;
  value: number;
  hasMoved?: boolean;
}

export type Square = (Piece | null)[];
export type BoardState = Square[]; // 64 squares or 8x8

export interface Move {
  fromRow: number;
  fromCol: number;
  toRow: number;
  toCol: number;
  piece: Piece;
  capturedPiece?: Piece | null;
  promotion?: PieceType;
  san: string; // Standard Algebraic Notation
}

export interface MoveHistoryRecord {
  move: Move;
  boardSnapshot: (Piece | null)[][];
  evalScore: number;
  timestamp: string;
}

export interface HashTableEntry {
  key: string; // Zobrist hash key
  depth: number;
  score: number;
  flag: 'EXACT' | 'ALPHA' | 'BETA';
  bestMove: string;
}

export interface CSourceFile {
  filename: string;
  category: 'Header' | 'Implementation' | 'Build' | 'Documentation';
  description: string;
  content: string;
}

export type ActiveTab = 'play' | 'datastructures' | 'memory' | 'complexity' | 'code' | 'teacherguide';
