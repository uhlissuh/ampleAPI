'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.runSql(`
    CREATE INDEX business_search_idx
    ON businesses
    USING GIN
    (to_tsvector('english', name));
  `);
};

exports.down = async function(db) {
  await db.removeIndex('businesses', 'business_search_idx');
};

exports._meta = {
  "version": 1
};
