'use strict';

const config = require( '@application/config' ),
   log = require( '@application/logger' ),
   redis = require( 'redis' ),
   { promisify } = require( 'util' ),
   client = redis.createClient({

      host: config.STORAGE.HOST,
      port: config.STORAGE.PORT,
      password: config.STORAGE.PASSWORD,
   });

client.on( 'error', error => log.error( 'Redis error:', error ));
client.on( 'warning', message => log.warn( 'Redis warning:', message ));
client.on( 'connect', _=> log.info( 'Redis connect' ));
client.on( 'ready', _=> log.info( 'Redis ready' ));
client.on( 'reconnecting', _=> log.info( 'Redis reconnecting' ));
client.on( 'end', _=> log.info( 'Redis connection end' ));

module.exports = {

   client: config.NODE_ENV === 'production' ? undefined : client,
   get: promisify( client.get ).bind( client ),
   set: promisify( client.set ).bind( client ),
   del: promisify( client.del ).bind( client ),
};
