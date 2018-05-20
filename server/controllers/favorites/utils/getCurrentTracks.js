const find = require('ramda/src/find');
const propEq = require('ramda/src/propEq');

module.exports = (cache, query) => find(propEq('query', query), cache);
