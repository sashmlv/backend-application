'use strict';

import * as pino from 'pino';

export default function logger( data? ) {

   const log = pino( data )

   return {
      log,
      info: log.info.bind( log ),
      warn: log.warn.bind( log ),
      error: log.error.bind( log ),
   };
};
