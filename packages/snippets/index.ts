'use strict';

import deepmerge from 'deepmerge';

class Snippets {

   /**
    * Get type of variable
    * @param { * } - any value
    * @return { string } class
    **/
   getClass( obj ) {

      return {}.toString.call( obj ).slice( 8, -1 ).toLowerCase();
   }

   /**
    * Get readable datetime
    * @param { object } params
    * @param { string } params.dt - datetime
    * @param { string } params.sp - separator
    * @return { string }
    **/
   getReadableDatetime( params ) {

      const p = params || { sp: ' ' }
      const date = p.dt ? new Date( p.dt ) : new Date();

      return ( '0' + date.getDate()).slice( -2 ) + '.' +
         ( '0' + ( date.getMonth() + 1 )).slice( -2 ) + '.' +
         ( '0' + date.getFullYear()).slice( -2 ) + p.sp +
         ( '0' + date.getHours()).slice( -2 ) + ':' +
         ( '0' + date.getMinutes()).slice( -2 ) + ':' +
         ( '0' + date.getSeconds()).slice( -2 );
   }

   /**
    * Merge objects
    * @param { object } - a
    * @param { object } - b
    * @param { object } - options
    * @return { object }
    **/
   merge( a, b, options ) {

      return deepmerge( a, b, options );
   }

   /**
    * Creates a deep clone of an object
    * https://github.com/30-seconds/30-seconds-of-code#deepclone
    * @param { object } obj
    * @return { object }
    */
   deepClone( obj ) {

      if( obj === null ) {
         return null;
      };

      let clone = Object.assign({}, obj );

      Object.keys( clone ).forEach(
         key => ( clone[ key ] = typeof obj[ key ] === 'object' ? this.deepClone( obj[ key ]) : obj[ key ])
      );

      return Array.isArray( obj ) && obj.length ?
         ( clone.length = obj.length ) && Array.from( clone ) :
         Array.isArray( obj ) ?
         Array.from( obj ) :
         clone;
   };

   /**
    * Deep freezes an object
    * https://github.com/30-seconds/30-seconds-of-code#deepfreeze
    * @param { object } obj
    * @return { object }
    */
   deepFreeze( obj ) {

      return (

         Object.keys( obj ).forEach(

            prop => ! ( obj[ prop ] instanceof Object ) ||
               Object.isFrozen( obj[ prop ]) ?
               null :
               this.deepFreeze( obj[ prop ])
         ),

         Object.freeze( obj )
      );
   };
}

export default new Snippets();
