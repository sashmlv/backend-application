'use strict';

const config = require( '@application/config' ),
   { log } = require( '@application/logger' ),
   app = require( './app' ),
   server = require( 'http' ).createServer( app );

server.on( 'error', error => log.error( error ));

server.listen(

   config.PORT,
   config.HOST,
   _=> log({

      message:`Server listen on: ${ config.HOST }:${ config.PORT }`,
      level: 'info',
   })
);

module.exports = server;
