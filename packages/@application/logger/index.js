'use strict';

const pino = require( 'pino' ),
   os = require( 'os' ),
   config = require( '@application/config' ),
   { ModuleError } = require( 'module-error' ),
   opts = {

      level: config.LOG.LEVEL,
      prettyPrint: config.NODE_ENV === 'production' ? {} : { colorize: true },
   },
   log = pino( opts );

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
    * Log error
    * @param {object} error
    * @param {string} error.level
    * @return {object} Return error
    **/
   log( error ) {

      if( ! error ) {

         error = new ModuleError({

            message: 'Undefined error',
            code: 'UNDEFINED_ERROR',
            level: 'error',
         });
      }

      if( log[ error.level || 'error' ]){

         log[ error.level || 'error' ]( error );
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
