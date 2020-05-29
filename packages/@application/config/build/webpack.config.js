'use strict';

const Webpack = require( 'webpack' ),
   path = require( 'path' ),
   DIST = path.resolve( `${__dirname}/../dist` );

module.exports = {

   target: 'node',
   stats: env.NODE_ENV !== 'production' ? {

      all: false,
      colors: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      builtAt: true,
   } : {

      colors: true,
   },

   mode: env.NODE_ENV,
   entry: {

      index: './index',
   },
   output: {

      path: DIST,
      filename: '[name].[contenthash:8].js',
      libraryTarget: 'umd',
   },
   plugins: [

      new Webpack.ProgressPlugin(),
   ].filter( v => v )
};
