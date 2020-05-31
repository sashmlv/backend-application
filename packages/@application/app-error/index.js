'use strict';

const ModuleError = require( 'module-error' );

/**
 * App error class
 **/
class AppError extends ModuleError {

   /**
    * Create a error
    * @param {object} params
    * @param {string} params.name
    * @param {string} params.message
    * @param {string} params.code
    * @param {number} params.status
    * @param {*} params.data
    **/
   constructor( params ) {

      super( params );

      this.name = 'AppError';
      this.stack = ( new Error()).stack;
   };
};

module.exports = {

   AppError,
};
