'use strict';

const spinner = require( 'ora' )();
const rollup = require( 'rollup' );
const rollupConfig = require( './rollup.config' );
const ch = require( 'chalk' );
const snp = require( '@application/snippets' );
const config = require( './build.config' );

/**
 * build bundle
 **/
( async function build() {

   spinner.text = 'building...';
   spinner.color = 'white';
   spinner.start();

   await ( await rollup.rollup( rollupConfig )).write( rollupConfig.output );

   spinner.stop();
   spinner.text = ch.cyan( `Bundle build done at: ${ snp.getReadableDatetime()}\n` );
   spinner.succeed();
})();
