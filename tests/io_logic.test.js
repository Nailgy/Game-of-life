const fs = require('fs');
const { readInput, writeOutput } = require('../io_logic.js')

jest.mock('fs');

describe('readInput', () => {
    test('Input file should be parsed correctly', () => {
        const inputName = 'input.txt';
        const inputContent = '3\n8 5\n........\n..x.....\n..x.....\n..x.....\n........\n';
        fs.readFileSync.mockReturnValue(inputContent);
        const result = readInput(inputName);
        const aliveFromStart = result.initialState.reduce((accRow, row) => {
            return accRow + row.reduce((accCell, cell) => accCell + cell, 0);
          }, 0);
        

        expect(result.gens).toEqual(3);
        expect(result.rows).toEqual(5);
        expect(result.cols).toEqual(8);

        expect(result.initialState[1][2]).toEqual(1);
        expect(result.initialState[2][2]).toEqual(1);
        expect(result.initialState[3][2]).toEqual(1);
        expect(aliveFromStart).toEqual(3);

    });
});

describe('writeOutput', () => {
    test('Output file content should be written correctly', () => {
        const outputName = 'output.txt';
        const result = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];

        writeOutput(outputName, result);

        const expectedOutput = '........\n........\n.xxx....\n........\n........';
        expect(fs.writeFileSync).toHaveBeenCalledWith(outputName, expectedOutput);
    });
});
