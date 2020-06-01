'use strict';

const config = require( '@application/config' ),
   log = require( '@application/logger' ),
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

      warn: log.warn,
      error: log.error,
      debug: log.debug,
   },
});

module.exports = knex;
