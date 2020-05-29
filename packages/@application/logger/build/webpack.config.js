'use strict';

const Webpack = require( 'webpack' ),
   path = require( 'path' ),
   config = require( '@application/config' ),
   DIST = path.resolve( `${ __dirname }/../dist` );

module.exports = {

   target: 'node',
   stats: config.NODE_ENV !== 'production' ? {

      all: false,
      colors: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      builtAt: true,
   } : {

      colors: true,
   },

   mode: config.NODE_ENV,
   entry: {

      index: './index',
   },
   output: {

      path: DIST,
      filename: '[name].js',
      libraryTarget: 'umd',
   },
   plugins: [

      new Webpack.ProgressPlugin(),
   ].filter( v => v )
};
