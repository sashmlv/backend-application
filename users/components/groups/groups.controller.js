'use strict';

const gm = require( './groups.model' );

class GroupsController {

   /**
    * Create group
    * @param {object} data
    * @param {string} data.name
    * @return {object} Return group
    **/
   async create( data ) {
   };

   /**
    * Get grop
    * @param {object} data
    * @param {string} data.id
    * @param {string} data.name
    * @return {object} Return group
    **/
   async get( data ) {
   };

   /**
    * Update group
    * @param {object} data
    * @param {string} data.name
    * @return {object} Return group
    **/
   async update( data ) {
   };
};

module.exports = new GroupsController();
