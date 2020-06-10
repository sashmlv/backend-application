'use strict';

const Webpack = require( 'webpack' ),
   path = require( 'path' ),
   nodeExternals = require( 'webpack-node-externals' ),
   DIST = path.resolve( `${ __dirname }/../dist` );

module.exports = {

   target: 'node',
   mode: 'production',
   node: {

      __dirname: false,
      __filename: false,
   },
   optimization: {

      nodeEnv: false,
   },
   stats: {

      all: false,
      colors: true,
      errors: true,
      errorDetails: true,
      warnings: true,
      builtAt: true,
   },
   entry: {

      server: './app/server.js',
   },
   externals: [

      nodeExternals(),
   ],
   output: {

      path: DIST,
      filename: '[name].js',
      libraryTarget: 'umd',
   },
   plugins: [

      new Webpack.ProgressPlugin(),
   ],
};
