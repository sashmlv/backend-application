'use strict';

const config = require( '@appliacation/config' ),
   log = require( '@application/logger' );

const express = require( 'express' );

const server = {};

// server.listen({ host: config.HOST, port: config.PORT, }, ( err, address ) => {

//    if( err ) {

//       log.error( err );
//       process.exit( 1 );
//    };

//    config.NODE_ENV === 'production' ? (

//       console.log( log.prettyParams()),
//       log.info( `Listen at: ${ config.HOST }:${ config.PORT }` )
//    ) :
//       console.log( JSON.stringify({

//          HOST: config.HOST,
//          PORT: config.PORT,
//       }));
// });

module.exports = server;
