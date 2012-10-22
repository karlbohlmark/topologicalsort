var assert = require('assert');
var topologicalsort = require('./topologicalsort');

var deepEquals = function (arr1, arr2) {
	for(var i = 0; i< arr1.length; i++) {
		if( arr1[i] !== arr2[i] ) {
			return false;
		}
	}
	return true;
};

var testCases = [
	{
		graph: {
			'a': ['b', 'c'],
			'b': ['d']
		},
		acceptedOrders: [
			['d', 'b', 'c', 'a'],
			['c', 'd', 'b', 'a'],
			['d', 'c', 'b', 'a']
		]
	}
];

testCases.forEach( function (test) {
	var result = topologicalsort(test.graph);

	var success = test.acceptedOrders.some( function (order) {
		return deepEquals(order, result);
	});

	assert(success);
});

