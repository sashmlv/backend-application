'use strict';

import pino from 'pino';
import os from 'os';

let log;

export default function logger( data ) {

   log = log || pino( data );

   return {
      log,
      info: log.info.bind( log ),
      warn: log.warn.bind( log ),
      error: log.error.bind( log ),

      /**
       * Get pretty parameters
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
