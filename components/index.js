'use strict';

const log = require( '../libs/logger' );

const userRoutes = require( './user.routes' );

module.exports = {

    init( opt ) {
        opt.Fastify.register( userRoutes, opt );
    }

};