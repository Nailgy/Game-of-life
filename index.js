const { readInput, writeOutput } = require('./io_logic');
const { simulateLife } = require('./game.js');

const inputName = 'input.txt';
const outputName = 'output.txt';


// we dont need to get rows and cols from input since all functions 
// determine rows and cols based on the field sizes given as argument
// but we can get rows and cols from this func if it will be needed for some reason

const { gens, initialState } = readInput(inputName);
const result = simulateLife(initialState, gens);
writeOutput(outputName, result);
