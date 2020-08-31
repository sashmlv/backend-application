'use strict';

const config = require( '@application/config' ),
   { log } = require( '@application/logger' ),
   redis = require( 'redis' ),
   { promisify } = require( 'util' ),
   client = redis.createClient({

      host: config.STORAGE.HOST,
      port: config.STORAGE.PORT,
      password: config.STORAGE.PASSWORD,
   });

if( ! config.STORAGE.ENABLED ) {

   client.quit();
};

client.on( 'error', e => log(

   ( e.message = `Redis error: ${ e.message }`, e.level = 'error', e )
));

client.on( 'warning', msg => log({

   message: `Redis warning: ${ msg }`,
   level: 'warning',
}));

client.on( 'connect', _=> log({

   message: `Redis connect`,
   level: 'info',
}));

client.on( 'ready', _=> log({

   message: `Redis ready`,
   level: 'info',
}));

client.on( 'reconnecting', _=> log({

   message: `Redis reconnecting`,
   level: 'info',
}));

client.on( 'end', _=> log({

   message: `Redis connection end`,
   level: 'info',
}));

module.exports = {

   client: config.NODE_ENV === 'production' ? undefined : client,
   get: promisify( client.get ).bind( client ),
   set: promisify( client.set ).bind( client ),
   del: promisify( client.del ).bind( client ),
};
