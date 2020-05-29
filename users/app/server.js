'use strict';

import config from '../configs/app.config';
import logger from '@application/logger';

const log = logger({});

const server = require( 'fastify' )({

});

server.listen({ host: config.HOST, port: config.PORT, }, ( err, address ) => {

   if( err ) {

      log.error( err );
      process.exit( 1 );
   };

   config.NODE_ENV === 'production' ? (

      console.log( log.prettyParams()),
      log.info( `Listen at: ${ config.HOST }:${ config.PORT }` )
   ) :
      console.log( JSON.stringify({

         HOST: config.HOST,
         PORT: config.PORT,
      }));
});

export default server;
