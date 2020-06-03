'use strict';

const db = require( '@application/db-sql' );

class PermissionsModel {

   /**
    * Create permission
    * @param {object} data
    * @param {string} data.name
    * @return {object} Return permission
    **/
   async create( data ) {
   };

   /**
    * Get permission
    * @param {object} data
    * @param {string} data.name
    * @return {object} Return permission
    **/
   async get( data ) {
   };

   /**
    * Update permission
    * @param {object} data
    * @return {object} Return permission
    **/
   async update( data ) {
   };
};

module.exports = new PermissionsModel();
