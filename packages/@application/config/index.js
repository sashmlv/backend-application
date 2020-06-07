'use strict';

const path = require( 'path' ),
   fs = require( 'fs' ),
   dotenv = require( 'dotenv' ),
   sp = require( 'snippets' ),
   crypt = require( '@application/crypt' ),
   APP_ROOT = process.env.PWD || process.cwd(),
   PASSWORD = process.env.PASSWORD,
   SALT = process.env.SALT;

/* Get environment variables */
let env = {

   NODE_ENV: process.env.NODE_ENV,
};

if( ! env.NODE_ENV ){

   env = dotenv.config().parsed || env;
};

if( ! env || ! env.NODE_ENV ){

   env = dotenv.config({ path: path.resolve( `${ APP_ROOT }/.env` )}).parsed || env;
};

/* defaults */
env.NODE_ENV = env.NODE_ENV || 'development';

/* Get application config */
let config = {

   SERVER: {

      HOST: '0.0.0.0',
      PORT: '3000',
      ENABLED: true,
   },
   DB: {

      CLIENT: 'pg',
      VERSION: '12',
      HOST: '0.0.0.0',
      USER: 'user',
      PASSWORD: 'password',
      DATABASE: 'dbname',
      DEBUG: env.NODE_ENV === 'production' ? true : false,
      ENABLED: true,
      MIGRATIONS_ENABLED: true,
   },
   STORAGE: {

      HOST: '0.0.0.0',
      PORT: '6379',
      PASSWORD: 'password',
      ENABLED: true,
   },
   LOGGER: {

      LEVEL: env.NODE_ENV === 'production' ? 'info' : 'debug',
      ENABLED: true,
   },
};

const configFile = path.resolve( `${ APP_ROOT }/config.${ env.NODE_ENV }.js` );

if( fs.existsSync( configFile )){

   config = Object.assign(
      config,
      fs.readFileSync( configFile, 'utf8' ),
   );
};

config.NODE_ENV = env.NODE_ENV;
config.env = env;

/* decrypt credentials */
if( PASSWORD && SALT ){

   crypt.initSync( PASSWORD, SALT );

   config.DB.PASSWORD = crypt.decrypt( config.DB.PASSWORD );
   config.STORAGE.PASSWORD = crypt.decrypt( config.STORAGE.PASSWORD );
}

module.exports = config.NODE_ENV === 'production' ? sp.deepFreeze( config ) : config;
