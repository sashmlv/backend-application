'use strict';

const config = require( '@application/config' ),
   { log } = require( '@application/logger' ),
   app = require( './app' ),
   server = require( 'http' ).createServer( app );

server.on( 'error', error => log.error( error ));

if( config.SERVER.ENABLED ){

   server.listen(

      config.SERVER.PORT,
      config.SERVER.HOST,
      _=> log({

         message:`Server listen on: ${ config.SERVER.HOST }:${ config.SERVER.PORT }`,
         level: 'info',
      })
   );
};

module.exports = server;
