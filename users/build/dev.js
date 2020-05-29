'use strict';



// TODO: copy config



/* start development process */
const path = require( 'path' );
const { spawn } = require( 'child_process' );
const rollup = require( 'rollup' );
const chokidar = require( 'chokidar' );
const snp = require( '@application/snippets' );
const ch = require( 'chalk' );
const spinner = require( 'ora' )();
const config = require( './build.config' );
const rollupConfig = require( './rollup.config' );
const mt = require( './maintenance' );

let pid, processExists;

process.on( 'exit',  _=> pid && process.kill( pid ));

const watcher = chokidar.watch([

   config.APP,
   config.CONFIGS,
], {

   ignoreInitial: true,
});

watcher
   .on( 'ready', async _=> { try { await buildAndRun();} catch( e ) { mt.log( e, '\n', ch.red );}})
   .on( 'all', async ( ev, pth ) => {

      try {

         processExists = process.kill( pid, 0 );
      }
      catch( e ) {

         processExists = e.code === 'EPERM' ? true : false;
      }

      try {

         processExists && process.kill( pid );

         mt.log( `${ ch.magenta( '• ' + ev )} ${ ch.blue( path.basename( pth ))}\n` );

         await buildAndRun();
      }
      catch( e ) {

         mt.log( e, '\n', ch.red );
      };
   });

/**
 * build bundle and run application
 **/
async function buildAndRun() {

   let bOk = false, rOk = false, data;

   try {

      spinner.text = 'building...';
      spinner.color = 'white';
      spinner.start();

      await build();

      bOk = true;
      spinner.stop();
      spinner.text = ch.cyan( `Build at: ${ snp.getReadableDatetime()}\n` );
      spinner.succeed();

      data = JSON.parse( await run());
      rOk = true;

      mt.log( ch.green( '✔' ) + ch.cyan( ` App listen: ${ data.HOST }:${ data.PORT }\n` ));
   }
   catch( e ) {

      ! bOk && (

         spinner.stop(),
         spinner.text = ch.cyan( `Build failed at: ${ snp.getReadableDatetime()}\n` ),
         spinner.fail()
      );

      ! rOk && mt.log( ch.red( '✖' ) + ch.cyan( ` App listen: ${ data.HOST }:${ data.PORT }\n` ));
      throw e;
   };
};

/**
 * build bundle
 **/
async function build() { return await ( await rollup.rollup( rollupConfig )).write( rollupConfig.output );};

/**
 * run application
 **/
async function run() {

   let started = false;

   return new Promise(( resolve, reject ) => {

      try {

         const p = spawn( 'node', [ `${ config.DIST }` ]);

         pid = p.pid;

         p.stdout.on( 'data', data => {
            started && mt.log( `${ data }` );
            started = true;
            return resolve( data );
         });

         p.stderr.on( 'data', data => {
            started && mt.log( `${ data }` );
            started = true;
            return reject( data );
         });
      }
      catch( e ) {

         started = true;
         reject( e );
      };
   });
};
