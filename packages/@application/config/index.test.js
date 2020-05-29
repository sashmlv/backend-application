'use strict';

const test = require( 'ava' ),
   config = require( './index' );

test( 'config', t => {

	t.deepEqual( Object.keys( config ), [ 'NODE_ENV', 'env' ]);
});
