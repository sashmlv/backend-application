'use strict';

const path = require( 'path' );
// const fs = require( 'fs' );

const ROOT = path.resolve( `${ __dirname }/..` );
const DIST = path.resolve( `${ ROOT }/dist` );
const APP = path.resolve( `${ ROOT }/app` );
const CONFIGS = path.resolve( `${ ROOT }/configs` );

module.exports = {

   DIST,
   ROOT,
   APP,
   CONFIGS,
};
