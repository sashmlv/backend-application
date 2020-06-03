'use strict';

const pm = require( './permissions.model' );

class PermissionsController {

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
    * @param {string} data.id
    * @param {string} data.name
    * @return {object} Return permission
    **/
   async get( data ) {
   };

   /**
    * Update permission
    * @param {object} data
    * @param {string} data.name
    * @return {object} Return permission
    **/
   async update( data ) {
   };
};

module.exports = new PermissionsController();
