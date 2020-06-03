'use strict';

const sinon = require( 'sinon' ),
   rewire = require( 'rewire' ),
   test = require( 'ava' ),
   eh = rewire( './index' ),
   log = eh.__get__( 'log' );

log.error = sinon.spy();

test( 'error handler', t => {

   const error = eh.handle();

   t.deepEqual( error.code, 'UNDEFINED_ERROR' );
   t.deepEqual( error.level, 'error' );
   t.deepEqual( log.error.callCount, 1 );
});
