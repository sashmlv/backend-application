'use strict';

/* the application config */
const path = require( 'path' );
const fs = require( 'fs' );
const snp = require( '@application/snippets' );
const DIST = path.resolve( `${ __dirname }` );
const ENV = path.resolve( `${ DIST }/.env` );

const env = fs.existsSync( ENV ) && JSON.parse( fs.readFileSync( ENV, 'utf8' )) || {};

const NODE_ENV = process.env.NODE_ENV || ( process.env.NODE_ENV = env.NODE_ENV || 'development' );
const CONFIG = path.resolve( `${ DIST }/app.config.${ NODE_ENV }.json` );

const defaults = {

   HOST: '0.0.0.0',
   PORT: 3000,

   DB: {

      CLIENT: 'pg',
      VERSION: '11',
      HOST: '0.0.0.0',
      USER: 'user',
      PASSWORD: 'password',
      DATABASE: 'database'
   },
};

let config;

try {

   config = JSON.parse( fs.readFileSync( CONFIG, 'utf8' ));
   config = snp.merge(
      defaults,
      config,
      {
         NODE_ENV: NODE_ENV,
         PATH: {
            DIST,
            ENV,
            CONFIG,
         },
      }
   );
}
catch( e ) {

   console.log( e );
};

export default snp.deepFreeze( config );
