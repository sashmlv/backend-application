'use strict';

const config = require( '@application/config' ),
   eh = require( '@application/error-handler' ),
   Knex = require( './knex' );

const knex = Knex({

   client: config.DB.CLIENT,
   version: config.DB.VERSION,
   debug: config.DB.DEBUG,
   connection: {

      host: config.DB.HOST,
      user: config.DB.USER,
      password: config.DB.PASSWORD,
      database: config.DB.DATABASE,
   },
   log: {

      warn: e => eh.handle(( e.level = 'warn', e )),
      error: e => eh.handle(( e.level = 'error', e )),
      debug: e => eh.handle(( e.level = 'debug', e )),
   },
});

module.exports = knex;
