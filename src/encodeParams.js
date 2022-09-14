const { encode } = require ('@api3/airnode-abi');
const { decode } = require ('@api3/airnode-abi');

const params = [
    { type: 'string', name: 'symbol', value: 'TSLA' }, { type: 'string', name: 'event', value: 'Trade' }, { type: 'string', name: '_path', value: 'Trade.TSLA.price' }, { type: 'string', name: '_type', value: 'int256' }
];

const encodedData = encode(params);
const decodedData = decode(encodedData);

console.log(encodedData);
console.log(decodedData);