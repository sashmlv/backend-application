'use strict';

const config = require( '../configs/config' );
const log = require( '../libs/logger' );
const Fastify = require( '../app' ).Fastify;

Fastify.listen( config.PORT, config.HOST, ( err, address ) => {
    if( err ) {
        log.error( err );
        process.exit( 1 );
    };
    log.info( `Server listening on ${ address }` );
});
