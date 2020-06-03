'use strict';

const um = require( './users.model' );

class UsersController {

   /**
    * Signup user
    * @param {object} data
    * @param {string} data.login
    * @param {string} data.email
    * @param {string} data.password
    * @return {object} Return user
    **/
   async signup( data ) {
   };

   /**
    * Signin user
    * @param {object} data
    * @param {string} data.login
    * @param {string} data.email
    * @param {string} data.password
    * @return {object} Return tokens
    **/
   async signin( data ) {
   };

   /**
    * Refresh user tokens
    * @param { object } data
    * @param { string } data.access
    * @param { string } data.refresh
    * @return { object } Return tokens
    **/
   async refresh( data ) {
   };

   /**
    * Get user
    * @param { object } data
    * @param { string } data.id
    * @param { string } data.login
    * @param { string } data.email
    * @return { object } Return user
    **/
   async get( data ) {
   };

   /**
    * Update user
    * @param { object } data
    * @return { object } Return user
    **/
   async update( data ) {
   };
};

module.exports = new UsersController();
