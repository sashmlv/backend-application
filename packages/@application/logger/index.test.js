'use strict';

const test = require( 'ava' ),
   log = require( './index' );

test( 'logger', t => {

	t.deepEqual( Object.getPrototypeOf( log.log ).constructor.name, 'Pino' );
});
