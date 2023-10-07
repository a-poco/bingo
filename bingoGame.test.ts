import { fetchDataFromFile, findLastWinningBoardAndScore } from './bingoGame'

describe('fetchDataFromFile', () => {
  it('should fetch correct data from the file', () => {
    const expectedOutput = [
      [85, 23, 65, 78, 93],
      [27, 53, 10, 12, 26],
      [5, 34, 83, 25, 6],
      [56, 40, 73, 29, 54],
      [33, 68, 41, 32, 82]
    ];
    const result = fetchDataFromFile('data.txt')
    expect(result[0]).toEqual(expectedOutput)
  })
})

describe('Bingo functions', () => {
    const drawNumbers = [7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1]

    const boards = [
        [
            [22, 13, 17, 11, 0],
            [8, 2, 23, 4, 24],
            [21, 9, 14, 16, 7],
            [6, 10, 3, 18, 5],
            [1, 12, 20, 15, 19]
        ],
        [
            [3, 15, 0, 2, 22],
            [9, 18, 13, 17, 5],
            [19, 8, 7, 25, 23],
            [20, 11, 10, 24, 4],
            [14, 21, 16, 12, 6]
        ],
        [
            [14, 21, 17, 24, 4],
            [10, 16, 15, 9, 19],
            [18, 8, 23, 26, 20],
            [22, 11, 13, 6, 5],
            [2, 0, 12, 3, 7]
        ]
    ];

    it('should correctly identify the last winning board and its score', () => {
        const result = findLastWinningBoardAndScore(drawNumbers, boards)
        expect(result.boardIndex).toEqual(1)
        expect(result.score).toEqual(1924)
    })
})







