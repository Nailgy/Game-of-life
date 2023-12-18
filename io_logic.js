const fs = require('fs');

function readInput(filename) {
    const input = fs.readFileSync(filename, 'utf-8').split('\n');
    const gens = parseInt(input[0], 10);
    const [cols, rows] = input[1].split(' ').map(Number);
    const initialState = input.slice(2).map(row => row.trim().split('').map(cell => (cell === 'x' ? 1 : 0)));

    return { gens, rows, cols, initialState };
}

function writeOutput(filename, result) {
    const output = result.map(row => row.map(cell => (cell === 1 ? 'x' : '.')).join('')).join('\n');
    fs.writeFileSync(filename, output);
}

module.exports = {
    readInput,
    writeOutput
};