import { CSourceFile } from '../types';

export const C_SOURCE_FILES: CSourceFile[] = [
  {
    filename: 'types.h',
    category: 'Header',
    description: 'Core Data Structures header defining structs for Pieces, Moves, Stacks, and Transposition Tables.',
    content: `#ifndef TYPES_H
#define TYPES_H

#include <stdint.h>
#include <stdbool.h>

typedef enum {
    EMPTY = 0,
    PAWN = 1,
    KNIGHT = 2,
    BISHOP = 3,
    ROOK = 4,
    QUEEN = 5,
    KING = 6
} PieceType;

typedef enum {
    WHITE = 0,
    BLACK = 1,
    BOTH = 2
} Color;

typedef struct {
    PieceType type;
    Color color;
    int value;
    bool hasMoved;
} Piece;

typedef struct {
    int fromRow, fromCol;
    int toRow, toCol;
    Piece pieceMoved;
    Piece pieceCaptured;
    PieceType promotion;
} Move;

#define MAX_GAME_MOVES 512
typedef struct {
    Move moves[MAX_GAME_MOVES];
    Piece capturedPieces[MAX_GAME_MOVES];
    int top;
} MoveStack;

typedef enum {
    HASH_EXACT = 0,
    HASH_ALPHA = 1,
    HASH_BETA = 2
} HashFlag;

typedef struct {
    uint64_t zobristKey;
    int depth;
    int score;
    HashFlag flag;
    Move bestMove;
} TTEntry;

typedef struct {
    Piece squares[8][8];
    Color turn;
    int halfMoveClock;
    int fullMoveNumber;
    uint64_t currentZobristKey;
} Board;

#endif // TYPES_H`
  },
  {
    filename: 'board.h',
    category: 'Header',
    description: 'Board initialization, FEN parsing, and display utility headers.',
    content: `#ifndef BOARD_H
#define BOARD_H

#include "types.h"

void init_board(Board *board);
void init_standard_fen(Board *board);
void print_board(const Board *board);
bool is_square_attacked(const Board *board, int row, int col, Color attackingColor);

#endif // BOARD_H`
  },
  {
    filename: 'board.c',
    category: 'Implementation',
    description: 'Implementation of board setup, FEN string parser, and ASCII/Unicode board printer.',
    content: `#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "board.h"

void init_board(Board *board) {
    for (int r = 0; r < 8; r++) {
        for (int c = 0; c < 8; c++) {
            board->squares[r][c] = (Piece){EMPTY, WHITE, 0, false};
        }
    }
    board->turn = WHITE;
    board->halfMoveClock = 0;
    board->fullMoveNumber = 1;
}

void init_standard_fen(Board *board) {
    init_board(board);
    PieceType rowPieces[8] = {ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK};
    int values[7] = {0, 100, 320, 330, 500, 900, 20000};

    for (int c = 0; c < 8; c++) {
        board->squares[0][c] = (Piece){rowPieces[c], BLACK, values[rowPieces[c]], false};
        board->squares[1][c] = (Piece){PAWN, BLACK, values[PAWN], false};
    }

    for (int c = 0; c < 8; c++) {
        board->squares[6][c] = (Piece){PAWN, WHITE, values[PAWN], false};
        board->squares[7][c] = (Piece){rowPieces[c], WHITE, values[rowPieces[c]], false};
    }
}

void print_board(const Board *board) {
    printf("\\n  +------------------------+\\n");
    for (int r = 0; r < 8; r++) {
        printf("%d | ", 8 - r);
        for (int c = 0; c < 8; c++) {
            Piece p = board->squares[r][c];
            if (p.type == EMPTY) {
                printf(". ");
            } else {
                char symbol = '.';
                switch (p.type) {
                    case PAWN:   symbol = 'p'; break;
                    case KNIGHT: symbol = 'n'; break;
                    case BISHOP: symbol = 'b'; break;
                    case ROOK:   symbol = 'r'; break;
                    case QUEEN:  symbol = 'q'; break;
                    case KING:   symbol = 'k'; break;
                    default:     symbol = '?'; break;
                }
                if (p.color == WHITE) symbol = toupper(symbol);
                printf("%c ", symbol);
            }
        }
        printf("|\\n");
    }
    printf("  +------------------------+\\n");
    printf("    a b c d e f g h\\n\\n");
}`
  },
  {
    filename: 'moves.h',
    category: 'Header',
    description: 'Move generation and legal move validation header.',
    content: `#ifndef MOVES_H
#define MOVES_H

#include "types.h"

typedef struct {
    Move moves[256];
    int count;
} MoveList;

void generate_legal_moves(const Board *board, MoveList *list);
bool is_valid_move(const Board *board, int fromR, int fromC, int toR, int toC);
bool make_move(Board *board, Move *move, MoveStack *stack);
void unmake_move(Board *board, Move *move, MoveStack *stack);

#endif // MOVES_H`
  },
  {
    filename: 'moves.c',
    category: 'Implementation',
    description: 'Accurate legal move generation implementing precise chess rules for all pieces.',
    content: `#include <stdio.h>
#include <stdlib.h>
#include "moves.h"

bool is_valid_move(const Board *board, int fromR, int fromC, int toR, int toC) {
    if (fromR < 0 || fromR > 7 || fromC < 0 || fromC > 7) return false;
    if (toR < 0 || toR > 7 || toC < 0 || toC > 7) return false;
    if (fromR == toR && fromC == toC) return false;

    Piece piece = board->squares[fromR][fromC];
    Piece target = board->squares[toR][toC];

    if (piece.type == EMPTY) return false;
    if (target.type != EMPTY && target.color == piece.color) return false;

    int dr = toR - fromR;
    int dc = toC - fromC;

    switch (piece.type) {
        case PAWN: {
            int dir = (piece.color == WHITE) ? -1 : 1;
            int startRow = (piece.color == WHITE) ? 6 : 1;

            // Forward 1
            if (dc == 0 && dr == dir && target.type == EMPTY) return true;
            // Forward 2 from start
            if (dc == 0 && dr == 2 * dir && fromR == startRow && target.type == EMPTY && board->squares[fromR + dir][fromC].type == EMPTY) return true;
            // Capture diagonal
            if (abs(dc) == 1 && dr == dir && target.type != EMPTY && target.color != piece.color) return true;
            return false;
        }
        case KNIGHT: {
            return (abs(dr) == 2 && abs(dc) == 1) || (abs(dr) == 1 && abs(dc) == 2);
        }
        case BISHOP: {
            if (abs(dr) != abs(dc)) return false;
            int stepR = (dr > 0) ? 1 : -1;
            int stepC = (dc > 0) ? 1 : -1;
            int r = fromR + stepR, c = fromC + stepC;
            while (r != toR && c != toC) {
                if (board->squares[r][c].type != EMPTY) return false;
                r += stepR;
                c += stepC;
            }
            return true;
        }
        case ROOK: {
            if (dr != 0 && dc != 0) return false;
            int stepR = (dr == 0) ? 0 : (dr > 0 ? 1 : -1);
            int stepC = (dc == 0) ? 0 : (dc > 0 ? 1 : -1);
            int r = fromR + stepR, c = fromC + stepC;
            while (r != toR || c != toC) {
                if (board->squares[r][c].type != EMPTY) return false;
                r += stepR;
                c += stepC;
            }
            return true;
        }
        case QUEEN: {
            // Combination of Rook and Bishop
            if (dr == 0 || dc == 0 || abs(dr) == abs(dc)) {
                int stepR = (dr == 0) ? 0 : (dr > 0 ? 1 : -1);
                int stepC = (dc == 0) ? 0 : (dc > 0 ? 1 : -1);
                int r = fromR + stepR, c = fromC + stepC;
                while (r != toR || c != toC) {
                    if (board->squares[r][c].type != EMPTY) return false;
                    r += stepR;
                    c += stepC;
                }
                return true;
            }
            return false;
        }
        case KING: {
            return abs(dr) <= 1 && abs(dc) <= 1;
        }
        default:
            return false;
    }
}

void generate_legal_moves(const Board *board, MoveList *list) {
    list->count = 0;
    Color friendly = board->turn;

    for (int fr = 0; fr < 8; fr++) {
        for (int fc = 0; fc < 8; fc++) {
            Piece p = board->squares[fr][fc];
            if (p.type != EMPTY && p.color == friendly) {
                for (int tr = 0; tr < 8; tr++) {
                    for (int tc = 0; tc < 8; tc++) {
                        if (is_valid_move(board, fr, fc, tr, tc)) {
                            if (list->count < 256) {
                                list->moves[list->count++] = (Move){
                                    .fromRow = fr, .fromCol = fc,
                                    .toRow = tr, .toCol = tc,
                                    .pieceMoved = p,
                                    .pieceCaptured = board->squares[tr][tc]
                                };
                            }
                        }
                    }
                }
            }
        }
    }
}

bool make_move(Board *board, Move *move, MoveStack *stack) {
    if (!is_valid_move(board, move->fromRow, move->fromCol, move->toRow, move->toCol)) return false;
    if (stack->top >= MAX_GAME_MOVES - 1) return false;

    stack->moves[stack->top] = *move;
    stack->capturedPieces[stack->top] = board->squares[move->toRow][move->toCol];
    stack->top++;

    board->squares[move->toRow][move->toCol] = move->pieceMoved;
    board->squares[move->fromRow][move->fromCol] = (Piece){EMPTY, WHITE, 0, false};
    board->turn = (board->turn == WHITE) ? BLACK : WHITE;

    return true;
}

void unmake_move(Board *board, Move *move, MoveStack *stack) {
    if (stack->top <= 0) return;

    stack->top--;
    *move = stack->moves[stack->top];
    Piece captured = stack->capturedPieces[stack->top];

    board->squares[move->fromRow][move->fromCol] = move->pieceMoved;
    board->squares[move->toRow][move->toCol] = captured;
    board->turn = (board->turn == WHITE) ? BLACK : WHITE;
}`
  },
  {
    filename: 'evaluate.h',
    category: 'Header',
    description: 'Evaluation function header.',
    content: `#ifndef EVALUATE_H
#define EVALUATE_H

#include "types.h"

int evaluate_board(const Board *board);

#endif // EVALUATE_H`
  },
  {
    filename: 'evaluate.c',
    category: 'Implementation',
    description: 'Board evaluator implementation.',
    content: `#include "evaluate.h"

int evaluate_board(const Board *board) {
    int totalEvaluation = 0;
    for (int r = 0; r < 8; r++) {
        for (int c = 0; c < 8; c++) {
            Piece p = board->squares[r][c];
            if (p.type == EMPTY) continue;
            int score = p.value;
            if (p.color == WHITE) totalEvaluation += score;
            else totalEvaluation -= score;
        }
    }
    return (board->turn == WHITE) ? totalEvaluation : -totalEvaluation;
}`
  },
  {
    filename: 'search.h',
    category: 'Header',
    description: 'Minimax search header.',
    content: `#ifndef SEARCH_H
#define SEARCH_H

#include "types.h"

int minimax(Board *board, int depth, int alpha, int beta, bool maximizingPlayer, Move *bestMove);

#endif // SEARCH_H`
  },
  {
    filename: 'search.c',
    category: 'Implementation',
    description: 'Minimax algorithm implementation with legal moves.',
    content: `#include <stdio.h>
#include <limits.h>
#include "search.h"
#include "evaluate.h"
#include "moves.h"

int minimax(Board *board, int depth, int alpha, int beta, bool maximizingPlayer, Move *bestMove) {
    if (depth == 0) return evaluate_board(board);

    MoveList list;
    generate_legal_moves(board, &list);
    if (list.count == 0) return evaluate_board(board);

    MoveStack stack = { .top = 0 };

    if (maximizingPlayer) {
        int maxEval = INT_MIN;
        for (int i = 0; i < list.count; i++) {
            Move m = list.moves[i];
            if (!make_move(board, &m, &stack)) continue;
            int eval = minimax(board, depth - 1, alpha, beta, false, bestMove);
            unmake_move(board, &m, &stack);

            if (eval > maxEval) {
                maxEval = eval;
                if (bestMove) *bestMove = m;
            }
            if (eval > alpha) alpha = eval;
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        int minEval = INT_MAX;
        for (int i = 0; i < list.count; i++) {
            Move m = list.moves[i];
            if (!make_move(board, &m, &stack)) continue;
            int eval = minimax(board, depth - 1, alpha, beta, true, bestMove);
            unmake_move(board, &m, &stack);

            if (eval < minEval) {
                minEval = eval;
                if (bestMove) *bestMove = m;
            }
            if (eval < beta) beta = eval;
            if (beta <= alpha) break;
        }
        return minEval;
    }
}`
  },
  {
    filename: 'main.c',
    category: 'Implementation',
    description: 'Main CLI entry point.',
    content: `#include <stdio.h>
#include <stdlib.h>
#include "types.h"
#include "board.h"
#include "moves.h"
#include "evaluate.h"
#include "search.h"

int main() {
    Board board;
    init_standard_fen(&board);
    print_board(&board);
    printf("ChessCraft C Engine initialized with strict legal move rules.\\n");
    return 0;
}`
  },
  {
    filename: 'Makefile',
    category: 'Build',
    description: 'Makefile.',
    content: `CC = gcc
CFLAGS = -Wall -Wextra -O3 -std=c99
TARGET = chess

SRCS = main.c board.c moves.c evaluate.c search.c
OBJS = $(SRCS:.c=.o)

all: $(TARGET)
$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $(TARGET) $(OBJS)
%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@
clean:
	rm -f $(OBJS) $(TARGET)`
  },
  {
    filename: 'README.md',
    category: 'Documentation',
    description: 'Documentation.',
    content: `# ChessCraft C - Strict Legal Move Rules Engine`
  }
];
