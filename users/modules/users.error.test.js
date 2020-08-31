'use strict';

const test = require( 'ava' ),
   { UsersError, notFound } = require( './users.error' );

test( 'users error', t => {

   const usersError = new UsersError({

      name: 'unsuccessful',
      message: 'message',
      code: 'CODE',
      status: 200,
      data: { a: 1 },
   });

   t.deepEqual( usersError.name, 'UsersError' );
   t.deepEqual( usersError.message, 'message' );
   t.deepEqual( usersError.code, 'CODE' );
   t.deepEqual( usersError.status, 200 );
   t.deepEqual( usersError.data, { a: 1 });

   t.deepEqual( notFound.code, 'NOT_FOUND' );
   t.deepEqual( notFound.status, 404 );
});
