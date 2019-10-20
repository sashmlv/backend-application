'use strict';

module.exports = {

   log() {

      let args = [ ...arguments ];
      const clb = typeof args[ args.length - 1 ] === 'function' ? args.pop() : undefined;

      if( clb ) {

         args.length && ( args = args.map( v => clb( v )));
      }

      return console.log( ...args );
   }
};
