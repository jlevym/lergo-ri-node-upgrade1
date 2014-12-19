/**
 *
 *
 * @module types
 *
 * @description an empty file to describe types
 *                           *
 **/


/**
 * @description an object containing data for querying the db.
 * <pre>
 * {
 *    'filter' : {},
 *    'projection' : {},
 *    'sort' : {},
 *    'paging' : {
 *        'skip' : {}
 *        'limit' : {}
 *    }
 *
 * }
 * </p>
 *
 * @typedef {object} ComplexSearchQuery
 * @property {object} filter similar to mongo's filter. depends on the collection you're querying
 * @property {object} project similar to mongo's projection. depends on the collection you're querying.
 * @property {object} sort similar to mongo's sort. depends on the collection you're querying.
 * @property {object} paging contains information of the page.
 * @property {integer} paging.skip amount of entries to skip
 * @property {integer} paging.limit amount of entries to get.
 *
 **/