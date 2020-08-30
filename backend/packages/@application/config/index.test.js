'use strict';

const test = require( 'ava' ),
   sinon = require( 'sinon' ),
   rewire = require( 'rewire' ),

   /**
    * we have same instance of crypt like in config ( ./index.js )
    * and we can count calls for crypt methods
    **/
   crypt = require( '@application/crypt' );

let config;

crypt.initSync = sinon.spy(),
crypt.decrypt = sinon.spy();

test( 'config env', t => {

   config = rewire( './dist/index' );

   t.truthy( config.NODE_ENV );
   t.truthy( config.env );
});

test( 'config decrypt', t => {

   config = rewire( './dist/index' );

   t.deepEqual( crypt.initSync.callCount, 0 );
   t.deepEqual( crypt.decrypt.callCount, 0 );

   process.env.PASSWORD = '123';
   process.env.SALT = '321';

   config = rewire( './dist/index' );

   t.deepEqual( crypt.initSync.callCount, 1 );
   t.deepEqual( crypt.decrypt.callCount, 2 );
});

test( 'config frozen', t => {

   config = rewire( './dist/index' );

   t.notThrows( _=> config.HOST = 'http://example.com' );

   process.env.NODE_ENV = 'production';

   config = rewire( './dist/index' );

   t.throws( _=> config.HOST = 'http://example.com' );
});
