'use strict';

const { ModuleError } = require( 'module-error' );

/**
 * Crypt error class
 **/
class CryptError extends ModuleError {

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

      this.name = 'CryptError';
   };
};

module.exports = {

   CryptError,
};