'use strict';

const db = require( '@application/db-sql' );

class UsersModel {

   /**
    * Create user
    * @param { object } data
    * @param { string } data.login
    * @param { string } data.email
    * @param { string } data.password
    * @return { object } User
    **/
   async create( data ) {
   };

   /**
    * Get user
    * @param { object } data
    * @param { string } data.id
    * @param { string } data.login
    * @param { string } data.email
    * @return { object } User
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

module.exports = new UsersModel();
