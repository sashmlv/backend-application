'use strict';

/* the application config */
const path = require( 'path' );
const fs = require( 'fs' );
const shell = require( 'shelljs' );
const snp = require( 'snippets' );
const ROOT = path.resolve( `${ __dirname }/../dist` );

/* env */
const ENV = path.resolve( `${ ROOT }/.env` );
let env = {
   NODE_ENV: 'development'
};

! fs.existsSync( ENV ) && ( // create .env if not
   shell.mkdir( '-p', path.dirname( ENV )),
   fs.writeFileSync( ENV, JSON.stringify( env, undefined, 2 ))
);

env = JSON.parse( fs.readFileSync( ENV, 'utf8' ));
const NODE_ENV = process.env.NODE_ENV || ( process.env.NODE_ENV = env.NODE_ENV || 'development' );

/* congigs */
let config;
const CONFIG = path.resolve( `${ ROOT }/app.config.${ NODE_ENV }.json` );
const defaults = {

   NODE_ENV,
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

   PATH: {

      ROOT,
      ENV,
      CONFIG,
   },
};

! fs.existsSync( CONFIG ) && ( // create config if not
   shell.mkdir( '-p', path.dirname( CONFIG )),
   fs.writeFileSync( CONFIG, JSON.stringify( defaults, undefined, 2 ))
);

try { // add default params if not

   config = JSON.parse( fs.readFileSync( CONFIG, 'utf8' ));
   config = snp.merge( defaults, config );
}
catch( e ) {

   console.log( e );
};

export default snp.deepFreeze( config );
