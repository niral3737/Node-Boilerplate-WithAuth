const Response = require('../utils/Response');
const Res = require('./Res');

let response = new Res();

console.log(response);

response.error.push('Hello');

console.log(response);