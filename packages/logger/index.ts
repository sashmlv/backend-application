'use strict';

import pino from 'pino';

let log;

export default function logger( data ) {

   log = log || pino( data );

   return {
      log,
      info: log.info.bind( log ),
      warn: log.warn.bind( log ),
      error: log.error.bind( log ),
   };
};
