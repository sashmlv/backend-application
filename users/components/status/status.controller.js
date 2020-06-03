'use strict';

const sm = require( './status.model' );

class StatusController {

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
    * @param {string} data.id
    * @param {string} data.name
    * @return {object} Return status
    **/
   async get( data ) {
   };

   /**
    * Update status
    * @param {object} data
    * @param {string} data.name
    * @return {object} Return status
    **/
   async update( data ) {
   };
};

module.exports = new StatusController();
