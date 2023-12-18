function createEmptyField(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function getCellState(field, row, col) {
    const rows = field.length;
    const cols = field[0].length;

    if (row === rows || row === -1) {
        row = (row + rows) % rows;
    }

    if (col === cols || col === -1) {
        col = (col + cols) % cols;
    }

    if (row >= 0 && row < field.length && col >= 0 && col < field[0].length) {
        return field[row][col];
    }
    return 0;
}

function getNextCellState(field, row, col) {
    const aliveNeighbors = [
        getCellState(field, row - 1, col - 1),
        getCellState(field, row - 1, col),
        getCellState(field, row - 1, col + 1),
        getCellState(field, row, col - 1),
        getCellState(field, row, col + 1),
        getCellState(field, row + 1, col - 1),
        getCellState(field, row + 1, col),
        getCellState(field, row + 1, col + 1)
    ].reduce((sum, value) => sum + value, 0);

    if (field[row][col] === 1) {
        return aliveNeighbors === 2 || aliveNeighbors === 3 ? 1 : 0;
    } else {
        return aliveNeighbors === 3 ? 1 : 0;
    }
}

function getNextGen(currGen) {
    const rows = currGen.length;
    const cols = currGen[0].length;
    const nextGen = createEmptyField(rows, cols);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            nextGen[row][col] = getNextCellState(currGen, row, col);
        }
    }

    return nextGen;
}

function simulateLife(initialState, gens) {
    let currGen = initialState;
    for (let i = 0; i < gens; i++) {
        currGen = getNextGen(currGen);
    }

    return currGen;
}

module.exports = {
    createEmptyField,
    getCellState,
    getNextCellState,
    getNextGen,
    simulateLife
};