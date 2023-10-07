import { readFileSync } from 'fs';

type Cell = number;
type Row = Cell[];
type Board = Row[];
type BoardsCollection = Board[];

export const fetchDataFromFile = (filename: string): BoardsCollection => {
  const content = readFileSync(filename, 'utf8');

  const arrays: Board = content.trim().split('\n').map(line =>
    line.split(' ').filter(item => item !== '').map(Number)
  ).filter(row => row.length > 0);

  const boards: BoardsCollection = [];
  for (let i = 0; i < arrays.length; i += 5) {
    boards.push(arrays.slice(i, i + 5));
  }

  return boards;
}

const data = fetchDataFromFile('data.txt');

export const markNumber = (board: Board, number: Cell): Board => {
    return board.map(row => row.map(cell => (cell === number ? -1 : cell)));
}

export const isWinner = (board: Board): boolean => {
    return board.some(row => row.every(num => num === -1)) ||
           board[0].map((_, col) => board.map(row => row[col])).some(column => column.every(num => num === -1))
}

export const sumUnmarked = (board: Board): number => {
    return board.reduce((acc, row) => acc + row.reduce((acc, cell) => acc + (cell === -1 ? 0 : cell), 0), 0);
}

export const findLastWinningBoardAndScore = (
  drawNumbers: Cell[],
  boards: BoardsCollection
): { boardIndex: number, score: number } => {
    let winningOrder: { [index: number]: number } = {};
    drawNumbers.forEach((num, drawOrder) => {
        boards.forEach((board, boardIndex) => {
            if (winningOrder[boardIndex] === undefined) {
                boards[boardIndex] = markNumber(board, num);
                if (isWinner(boards[boardIndex])) {
                    winningOrder[boardIndex] = drawOrder;
                }
            }
        });
    });

    const lastBoardIndex = Object.keys(winningOrder).reduce((lastIdx, boardIdx) => 
    (winningOrder[+boardIdx] > (winningOrder[+lastIdx] || -1) ? +boardIdx : +lastIdx), -1
);

    const maxDrawOrder = winningOrder[lastBoardIndex];
    const lastBoardScore = sumUnmarked(boards[+lastBoardIndex]) * drawNumbers[maxDrawOrder];

    return { boardIndex: +lastBoardIndex, score: lastBoardScore };
}

const drawNumbers = [1,76,38,96,62,41,27,33,4,2,94,15,89,25,66,14,30,0,71,21,48,44,87,73,60,50,77,45,29,18,5,99,65,16,93,95,37,3,52,32,46,80,98,63,92,24,35,55,12,81,51,17,70,78,61,91,54,8,72,40,74,68,75,67,39,64,10,53,9,31,6,7,47,42,90,20,19,36,22,43,58,28,79,86,57,49,83,84,97,11,85,26,69,23,59,82,88,34,56,13];
const boards: BoardsCollection = data;

const result = findLastWinningBoardAndScore(drawNumbers, boards);
console.log(`The last board to win is board number ${result.boardIndex + 1}. Its score is ${result.score}.`);


