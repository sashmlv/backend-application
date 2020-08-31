'use strict';

const db = require( '@application/db-sql' );

class GroupsModel {

   /**
    * Create group
    * @param {object} data
    * @param {string} data.login
    * @param {string} data.email
    * @param {string} data.password
    * @return {object} Return group
    **/
   async create( data ) {
   };

   /**
    * Get group
    * @param {object} data
    * @param {string} data.id
    * @param {string} data.login
    * @param {string} data.email
    * @return {object} Return group
    **/
   async get( data ) {
   };

   /**
    * Update group
    * @param {object} data
    * @return {object} Return group
    **/
   async update( data ) {
   };
};

module.exports = new GroupsModel();
