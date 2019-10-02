'use strict';

import config from '../configs/app.config';

const server = require( 'fastify' )({
   http2: true,
});

server.listen({ port: config.PORT, host: config.HOST, }, ( err, address ) => {
   if( err ) {
      // log.error( err );
      process.exit( 1 );
   };
});

export default server;
