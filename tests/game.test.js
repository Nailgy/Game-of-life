const {
    createEmptyField,
    getCellState,
    getNextCellState,
    getNextGen,
    simulateLife
} = require('../game.js');

describe('createEmptyField', () => {
    test('Empty field should be created with correct size', () => {
        const rows = 3;
        const cols = 3;
        const result = createEmptyField(rows, cols);

        expect(result.length).toBe(rows);
        expect(result.every(row => row.length === cols && row.every(cell => cell === 0))).toBe(true);
    });
});

describe('getCellState', () => {
    test('Returned state of the cell should be correct', () => {
        const field = [
            [0, 1, 0],
            [1, 0, 1],
            [0, 1, 0]
        ];

        expect(getCellState(field, 0, 0)).toBe(0);
        expect(getCellState(field, 0, 1)).toBe(1);
        expect(getCellState(field, 2, 1)).toBe(1);
        expect(getCellState(field, 2, 2)).toBe(0);
    });

    test('Returned state of the cell with index on edge+-1 should be correct', () => {
        const field = [
            [0, 1, 0],
            [1, 0, 1],
            [0, 1, 0]
        ];

        expect(getCellState(field, -1, -1)).toBe(0);
        expect(getCellState(field, 2, 3)).toBe(0);
        expect(getCellState(field, 1, -1)).toBe(1);
    })

    test('Returned state of the cell with index out of edge+-1 should be 0', () => {
        const field = [
            [0, 1, 0],
            [1, 0, 1],
            [0, 1, 0]
        ];

        expect(getCellState(field, 100, 100)).toBe(0);
        expect(getCellState(field, -5, -3)).toBe(0);
        expect(getCellState(field, 123123, -123123)).toBe(0);
    })
});

describe('getNextCellState', () => {
    test('Returned next state of the cell should be correct', () => {
        const field = [
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 0, 0, 0],
            [1, 0, 1, 0]
        ];

        expect(getNextCellState(field, 0, 0)).toBe(0);
        expect(getNextCellState(field, 0, 1)).toBe(0);
        expect(getNextCellState(field, 1, 0)).toBe(1);
        expect(getNextCellState(field, 1, 1)).toBe(1);
        expect(getNextCellState(field, 2, 2)).toBe(0);
        expect(getNextCellState(field, 2, 3)).toBe(0);
        expect(getNextCellState(field, 3, 2)).toBe(1);
        expect(getNextCellState(field, 3, 3)).toBe(1);
    });
});

describe('getNextGen', () => {
    test('Next gen of the field should be return correctly', () => {
        const initialState = [
            [0, 1, 0, 1],
            [1, 0, 1, 0],
            [0, 0, 0, 0],
            [1, 0, 1, 0]
        ];
        const expectedNextGen = [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
        ]

        const result = getNextGen(initialState);
        
        for(let i = 0; i < initialState.length; i++) {
            for(let j = 0; j < initialState[i].length; j++)
            expect(result[i][j]).toBe(expectedNextGen[i][j])
        }
    });
});

describe('simulateLife', () => {
    test('Life simulation should be correct', () => {
        const initialState = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const expectedResult = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const generations = 3;
        const result = simulateLife(initialState, generations);
        
        for(let i = 0; i < initialState.length; i++) {
            for(let j = 0; j < initialState[i].length; j++)
            expect(result[i][j]).toBe(expectedResult[i][j])
        }
    });

    test('Life simulation should be correct for border passing (neighbors)', () => {
        const initialState = [
            [1, 0, 0, 0, 0, 0, 1, 0],
            [1, 0, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1],
        ];
        const expectedResult = [
            [1, 1, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0],
        ];
        const generations = 10;
        const result = simulateLife(initialState, generations);
        
        for(let i = 0; i < initialState.length; i++) {
            for(let j = 0; j < initialState[i].length; j++)
            expect(result[i][j]).toBe(expectedResult[i][j])
        }
    });
});
