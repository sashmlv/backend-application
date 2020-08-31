'use strict';

const config = require( '@application/config' ),
   { log } = require( '@application/logger' ),
   Knex = require( './knex' );

const knex = Knex({

   client: config.DB.CLIENT,
   version: config.DB.VERSION,
   debug: config.DB.DEBUG,
   connection: {

      host: config.DB.ENABLED ? config.DB.HOST : undefined,
      user: config.DB.USER,
      password: config.DB.PASSWORD,
      database: config.DB.DATABASE,
   },
   log: {

      warn: e => log(( e.level = 'warn', e )),
      error: e => log(( e.level = 'error', e )),
      debug: e => log(( e.level = 'debug', e )),
   },
});

module.exports = knex;
