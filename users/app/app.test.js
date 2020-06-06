'use strict';

const test = require( 'ava' ),
   sinon = require( 'sinon' ),
   rewire = require( 'rewire' ),
   app = rewire( './app' ),
   logger = app.__get__( 'logger' );

test( 'app logger', t => {

 	t.truthy( logger.logLib.error );
 	t.truthy( logger.logLib.warn );
 	t.truthy( logger.logLib.info );
});
