'use strict';

const config = require( './config' );

const knex = require( 'knex' )({
    client: config.DB.CLIENT,
    version: config.DB.VERSION,
    connection: {
        host: config.DB.HOST,
        user: config.DB.USER,
        password: config.DB.PASSWORD,
        database: config.DB.DATABASE,
    }
});

module.exports = knex;