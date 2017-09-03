import _ from 'lodash';

const array = [
	'a', true,
	'b', true,
	'c', false,
	'd', true,
	'e', false
];

const boolSet = _.flow(_.partialRight(_.chunk, 2), _.fromPairs, _.pickBy, _.keys);

const result = boolSet(array);

console.log('Initial array:', array);
console.log('Result:', result);

document.body.style.font = 'normal 18px Tahoma, serif';
document.body.innerHTML = `<p>Initial array: [${array}]</p>
							<p>Result of BoolSet function: [${result}]</p>
							<p>See console for more details`;
