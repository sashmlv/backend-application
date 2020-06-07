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

         message:`Server listen at: ${ config.SERVER.HOST }:${ config.SERVER.PORT }, NODE_ENV: ${ config.NODE_ENV }`,
         level: 'info',
      })
   );
};

module.exports = server;
