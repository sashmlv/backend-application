'use strict';

const config = require( '@application/config' ),
   eh = require( '@application/error-handler' ),
   redis = require( 'redis' ),
   { promisify } = require( 'util' ),
   client = redis.createClient({

      host: config.STORAGE.HOST,
      port: config.STORAGE.PORT,
      password: config.STORAGE.PASSWORD,
   });

client.on( 'error', e => eh.handle(

   ( e.message = `Redis error: ${ e.message }`, e.level = 'error', e )
));

client.on( 'warning', msg => eh.handle({

   message: `Redis warning: ${ msg }`,
   level: 'warning',
}));

client.on( 'connect', _=> eh.handle({

   message: `Redis connect`,
   level: 'info',
}));

client.on( 'ready', _=> eh.handle({

   message: `Redis ready`,
   level: 'info',
}));

client.on( 'reconnecting', _=> eh.handle({

   message: `Redis reconnecting`,
   level: 'info',
}));

client.on( 'end', _=> eh.handle({

   message: `Redis connection end`,
   level: 'info',
}));

module.exports = {

   client: config.NODE_ENV === 'production' ? undefined : client,
   get: promisify( client.get ).bind( client ),
   set: promisify( client.set ).bind( client ),
   del: promisify( client.del ).bind( client ),
};
