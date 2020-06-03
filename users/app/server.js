'use strict';

const config = require( '@application/config' ),
   eh = require( '@application/error-handler' ),
   app = require( './app' ),
   server = require( 'http' ).createServer( app );

server.on( 'error', error => log.error( error ));

server.listen(

   config.PORT,
   config.HOST,
   _=> eh.handle({

      message:`Server listen on: ${ config.HOST }:${ config.PORT }`,
      level: 'info',
   })
);

module.exports = server;
