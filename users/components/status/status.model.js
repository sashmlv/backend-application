'use strict';

const db = require( '@application/db-sql' );

class StatusModel {

   /**
    * Create status
    * @param {object} data
    * @param {string} data.name
    * @return {object} Return status
    **/
   async create( data ) {
   };

   /**
    * Get status
    * @param {object} data
    * @param {string} data.name
    * @return {object} Return status
    **/
   async get( data ) {
   };

   /**
    * Update status
    * @param {object} data
    * @return {object} Return status
    **/
   async update( data ) {
   };
};

module.exports = new StatusModel();
