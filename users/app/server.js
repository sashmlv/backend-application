'use strict';

const config = require( '@appliacation/config' ),
   log = require( '@application/logger' ),
   app = require( './app' ),
   server = require( 'http' ).createServer( app );

server.on( 'error', error => log.error( error ));

server.listen(

   config.PORT,
   config.HOST,
   _=> log.info( `Server listen on: ${ config.HOST }:${ config.PORT }` )
);

module.exports = server;
