'use strict';

const { ModuleError } = require( 'module-error' ),
   log = require( '@application/logger' );

/**
 * Error handler class
 **/
class ErrorHandler {

   /**
    * Create a error handler
    * @return {undefined}
    **/
   constructor() {

      process.on( 'unhandledRejection', error => {

         throw error;
      });

      process.on( 'uncaughtException', error => {

         this.handle( error );
      });
   };

   /**
    * Handle error
    * @param {object} error
    * @return {object} Return error
    **/
   handle( error ) {

      if( ! error ) {

         error = new ModuleError({

            message: 'Undefined error',
            code: 'UNDEFINED_ERROR',
            level: 'error',
         });
      }

      if( log[ error.level || 'error' ]){

         log[ error.level || 'error' ]( error );
      }

      return error;
   };
};

module.exports = new ErrorHandler();
