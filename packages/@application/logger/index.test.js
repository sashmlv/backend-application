'use strict';

const sinon = require( 'sinon' ),
   rewire = require( 'rewire' ),
   test = require( 'ava' ),
   logger = rewire( './index' ),
   logLibError = sinon.spy();

logger.__set__( 'logLib', {

   error: logLibError
});

logger.log = sinon.spy( logger.log );

test( 'error handler', t => {

   const error = logger.log();

   t.deepEqual( error.code, 'UNDEFINED_ERROR' );
   t.deepEqual( error.level, 'error' );
   t.deepEqual( logger.log.callCount, 1 );
   t.deepEqual( logLibError.callCount, 1 );
});
