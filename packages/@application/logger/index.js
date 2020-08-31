'use strict';

const pino = require( 'pino' ),
   os = require( 'os' ),
   config = require( '@application/config' ),
   { ModuleError } = require( 'module-error' ),
   opts = {

      level: config.LOGGER.LEVEL,
      prettyPrint: config.NODE_ENV === 'production' ? {} : { colorize: true },
   },
   logLib = pino( opts );

class Logger {

   /**
    * Create a logger
    * @return {undefined}
    **/
   constructor() {

      process.on( 'unhandledRejection', error => {

         throw error;
      });

      process.on( 'uncaughtException', error => {

         error = error || {};
         error.level = 'error';
         this.log( error );
      });
   };

   /**
    * Get logger lib instance
    * @return {object} Return logger lib instance
    **/
   get logLib() {

      return logLib;
   };

   /**
    * Log error
    * @param {object} error
    * @param {string} error.level
    * @return {object} Return error
    **/
   log( error ) {

      if( ! config.LOGGER.ENABLED ){

         return undefined;
      };

      if( ! error ) {

         error = new ModuleError({

            message: 'Undefined error',
            code: 'UNDEFINED_ERROR',
            level: 'error',
         });
      }

      if( logLib[ error.level || 'error' ]){

         logLib[ error.level || 'error' ]( error );
      }

      return error;
   };

   /**
    * Get pretty env parameters
    * @return {string}
    **/
   prettyParams() {

         return `\n
*** PARAMETERS: ***\n
========================================
Variable:                 | Value:
--------------------------------------------
NODE_ENV                  | ${ process.env.NODE_ENV }
--------------------------------------------
HOST                      | ${ process.env.HOST }
--------------------------------------------
PORT                      | ${ process.env.PORT }
--------------------------------------------
PROCESS ID                | ${ process.pid }
--------------------------------------------
ENV USER                  | ${ process.env.USER }
--------------------------------------------
ENV HOMEDIR               | ${ process.env.HOME }
--------------------------------------------
PLATFORM                  | ${ process.platform }
--------------------------------------------
CURRENT WORKING DIRECTORY | ${ process.cwd() }
--------------------------------------------
NODE VERSION              | ${ process.version }
--------------------------------------------
NODE USER                 | ${ os.userInfo().username }
--------------------------------------------
NODE HOMEDIR              | ${ os.userInfo().homedir }
--------------------------------------------
NODE TMPDIR               | ${ os.tmpdir() }
--------------------------------------------
DATE                      | ${ new Date() }
========================================
\n`;
   };

};

module.exports = new Logger();
