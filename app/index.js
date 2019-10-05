'use strict';

const Fastify = require( 'fastify' )();

const components = require( '../components' );
components.init({ Fastify });

module.exports = { Fastify };