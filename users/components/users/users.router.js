'use strict';

const Express = require( 'express' );
const router = Express.Router();

router.use( '/users', async ( req, res, next ) => {

   try {

   }
   catch( error ) {

      return next( error );
   }

   return next();
});

module.exports = router;
