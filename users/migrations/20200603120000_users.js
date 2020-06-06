'use strict';

exports.up = async function( db ) {

   await db.raw( 'CREATE TABLE IF NOT EXISTS users ()' );

   await db.schema.table( 'users', table => {

      table.increments( 'id' );
      table.string( 'login', 255 ).notNullable();
      table.string( 'email', 255 ).notNullable();
      table.string( 'password', 255 ).notNullable();
      table.timestamp( 'created_at' ).defaultTo( db.fn.now());
      table.timestamp( 'updated_at' ).defaultTo( db.fn.now());
      table.integer( 'status_id' ).nullable().defaultTo( 0 );
      table.index([ 'login', 'email', 'status_id' ]);
   });

   await db.schema.table( 'users', table => {

      table.foreign( 'status_id' ).references( 'id' ).inTable( 'status' );
   });

   await db.raw(`

      CREATE TRIGGER set_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE PROCEDURE set_updated_at();
   `);
};

exports.down = async function( db ) {

   await db.schema.raw( 'DROP TABLE IF EXISTS users CASCADE' );
};
