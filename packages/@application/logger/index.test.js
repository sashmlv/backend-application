'use strict';

const test = require( 'ava' ),
   logger = require( './index' ),
   log = logger({});

test( 'logger', t => {

	t.deepEqual( Object.getPrototypeOf( log.log ).constructor.name, 'Pino' );
});
