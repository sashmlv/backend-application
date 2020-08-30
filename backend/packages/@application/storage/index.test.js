'use strict';

const test = require( 'ava' ),
   sinon = require( 'sinon' ),
   rewire = require( 'rewire' ),
   redis = require( 'redis' );

redis.createClient = sinon.spy( _=> ({

   on: sinon.spy(),
   get: _=>_,
   set: _=>_,
   del: _=>_,
}));

const storage = rewire( './index' );

test( 'storage', async t => {

   t.deepEqual( redis.createClient.callCount, 1 );
});
