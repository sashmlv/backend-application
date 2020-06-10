'use strict';

/* Start development process */
const fs = require( 'fs' ),
   path = require( 'path' ),
   webpackConfig = require( './webpack.config' ),
   { log } = require( 'maintenance' ),
   ch = require( 'chalk' ),
   Webpack = require( 'webpack' ),
   { spawn } = require( 'child_process' );

// TODO: rework
const DIST = path.resolve( `${ __dirname }/../dist/server` );

let pid, processExists;
process.on( 'exit',  _=> pid && process.kill( pid ));

/* build */
webpackConfig.watch = true;
Webpack( webpackConfig, ( err, stats ) => {

   if( err ) {

      log.red( err.stack || err );
      err.details && log.red( err.details );
   }

   const info = stats.toJson();
   stats.hasErrors() && info.errors.forEach( e => log.red( e ));
   stats.hasWarnings() && info.warnings.forEach( w => log.red( w ));
   log(stats.toString( webpackConfig.stats ));

   try {

      processExists = process.kill( pid, 0 );
   }
   catch( e ) {

      processExists = e.code === 'EPERM' ? true : false;
   }

   try {

      processExists && process.kill( pid );

      const p = spawn( 'node', [ `${ DIST }` ]); // run bundle
      pid = p.pid;

      p.stdout.on( 'data', data => {
         log( `${ data }` );
      });

      p.stderr.on( 'data', data => {
         log( `${ data }` );
      });

   } catch( e ) {

      log( e );
   };

});
