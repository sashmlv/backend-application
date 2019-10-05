'use strict';

const db = require( '../configs/db' );
const log = require( '../libs/logger' );

module.exports = async function( fastify, opt ) {

    fastify.get( '/users', async( request, reply ) => {
        return { hello: 'users' };
    });

};