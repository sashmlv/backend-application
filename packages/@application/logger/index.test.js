'use strict';

const sinon = require( 'sinon' ),
   rewire = require( 'rewire' ),
   test = require( 'ava' ),
   logger = rewire( './index' ),
   logLibError = sinon.spy();

test( 'logger lib', t => {

 	t.deepEqual( Object.getPrototypeOf( logger.logLib ).constructor.name, 'Pino' );
});

test( 'logger log', t => {

   logger.__set__( 'logLib', {

      error: logLibError
   });

   logger.log = sinon.spy( logger.log );

   const error = logger.log();

   t.deepEqual( error.code, 'UNDEFINED_ERROR' );
   t.deepEqual( error.level, 'error' );
   t.deepEqual( logger.log.callCount, 1 );
   t.deepEqual( logLibError.callCount, 1 );
});
