'use strict';

const test = require( 'ava' ),
   db = require( './index' );

test( 'db', async t => {

   t.deepEqual( db.name, 'knex' );
});
