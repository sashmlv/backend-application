'use strict';

import test from 'ava';
import logger from './index';

const log = logger();

test( 'logger', t => {

	t.plan( 1 );

	t.deepEqual( Object.getPrototypeOf( log.log ).constructor.name, 'Pino' );
});
