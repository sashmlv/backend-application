'use strict';

const typescript = require( 'rollup-plugin-typescript2' );

module.exports = {

   input: './app/server.ts',

   output: {

      file: './dist/index.js',
      format: 'cjs',
   },
   external: [

      'pino',
      'os'
   ],

   plugins: [

      typescript()
   ]
};
