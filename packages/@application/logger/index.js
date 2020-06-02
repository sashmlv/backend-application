'use strict';

const pino = require( 'pino' ),
   os = require( 'os' ),
   config = require( '@application/config' ),
   opts = {

      level: config.LOG.LEVEL,
      prettyPrint: config.NODE_ENV !== 'production' ? { colorize: true } : {},
   },
   log = pino( opts );

/**
 * Logger
 * @param {object} opts
 * @return {object} Return logger object
 **/
function logger( opts ) {

   return {

      log,
      info: log.info.bind( log ),
      warn: log.warn.bind( log ),
      error: log.error.bind( log ),
      debug: log.debug.bind( log ),

      /**
       * Get pretty env parameters
       * @return { string }
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
      }
   };
};

module.exports = logger( opts );
