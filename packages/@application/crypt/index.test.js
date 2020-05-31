'use strict';

const test = require( 'ava' ),
   crypt = require( './index' ),
   { CryptError } = require( './crypt.error' );

test( 'crypt must be initialized', async t => {

   const error = t.throws( _=> crypt.encrypt( 'text' ));
   t.deepEqual( error.code, 'CRYPT_NOT_INITIALIZED' );
   t.truthy( error instanceof CryptError );
});

test( 'encrypt decrypt', async t => {

   await crypt.init( '123', '321' );
   const encrypted = crypt.encrypt( 'test text' ),
      decrypted = crypt.decrypt( encrypted );

   t.not( encrypted, 'test text' );
   t.deepEqual( decrypted, 'test text' );
});
