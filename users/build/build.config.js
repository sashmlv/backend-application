'use strict';

/* the build config */
const fs = require( 'fs' );
const path = require( 'path' );
const shell = require( 'shelljs' );
// const snp = require( '@application/snippets' );
const ROOT = path.resolve( `${ __dirname }/..` );
const DIST = path.resolve( `${ ROOT }/dist` );
const APP = path.resolve( `${ ROOT }/app` );
const CONFIGS = path.resolve( `${ ROOT }/configs` );
const ENV = path.resolve( `${ CONFIGS }/.env` );

/* env */
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
const CONFIG = path.resolve( `${ CONFIGS }/app.config.${ NODE_ENV }.json` );
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

module.exports = {

   ROOT,
   DIST,
   APP,
   CONFIGS,
};

// try { // add default params if not

//    config = JSON.parse( fs.readFileSync( CONFIG, 'utf8' ));
// j   config = snp.merge( defaults, config, { NODE_ENV: NODE_ENV });
// }
// catch( e ) {

//    console.log( e );
// };

// export default snp.deepFreeze( config );
