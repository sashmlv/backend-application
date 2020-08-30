'use strict';

const { AppError } = require( '@application/app-error' );

/**
 * Users error class
 **/
class UsersError extends AppError {

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

      this.name = 'UsersError';
   };
};

module.exports = {

   UsersError,

   get notFound() {

      return new UsersError({

         message: 'Not found',
         code: 'NOT_FOUND',
         status: 404,
      });
   },
};