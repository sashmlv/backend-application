'use strict';

const test = require( 'ava' ),
   AppError = require( './index' );

test( 'app error', t => {

   const appError = new AppError({

      name: 'unsuccessful',
      message: 'message',
      code: 'CODE',
      status: 200,
      data: { a: 1 },
   });

	t.deepEqual( appError.name, 'AppError' );
	t.deepEqual( appError.message, 'message' );
	t.deepEqual( appError.code, 'CODE' );
	t.deepEqual( appError.status, 200 );
	t.deepEqual( appError.data, { a: 1 });
});
