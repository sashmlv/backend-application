'use strict';

const test = require( 'ava' ),
   config = require( './index' );

test( 'config', t => {

   t.truthy( config.NODE_ENV );
   t.truthy( config.env );
});

test( 'config frozen', t => {

   t.throws( _=> config.HOST = 'http://example.com' );
});
