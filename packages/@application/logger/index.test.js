'use strict';

const sinon = require( 'sinon' ),
   rewire = require( 'rewire' ),
   test = require( 'ava' ),
   er = rewire( './index' ),
   log = er.__get__( 'log' );

log.error = sinon.spy();

test( 'error handler', t => {

   const error = er.log();

   t.deepEqual( error.code, 'UNDEFINED_ERROR' );
   t.deepEqual( error.level, 'error' );
   t.deepEqual( log.error.callCount, 1 );
});
