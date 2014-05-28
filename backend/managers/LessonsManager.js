'use strict';
var appContext = require('../ApplicationContext');
var logger = appContext.logManager.getLogger('LessonsManager');
var dbManager = appContext.dbManager;
var errorManager = appContext.errorManager;

exports.createLesson = function(lesson, callback) {
	logger.info('Creating lesson');
	dbManager.connect('lessons', function(db, collection, done) {
		collection.insert(lesson, function(err) {
			if (!!err) {
				logger.error('error creating lesson [%s] : [%s]', lesson.name, err);
				callback(new errorManager.InternalServerError());
				done();
				return;
			} else {
				logger.info('Lesson [%s] created successfully. invoking callback', lesson.name);
				callback(null, lesson);
				done();
				return;
			}
		});
	});
};

exports.updateLesson = function(lesson, callback) {
	logger.info('Updating lesson');

	dbManager.connect('lessons', function(db, collection, done) {

		collection.update( { '_id' : lesson._id, 'userId' : lesson.userId } , lesson, function(err) {
			if (!!err) {
				logger.error('error in updating lesson [%s] : [%s]', lesson.name, err);
				callback(new errorManager.InternalServerError());
				done();
				return;
			} else {
				logger.info('Lesson [%s] updated successfully. invoking callback', lesson.name);
				callback(null, lesson);
				done();
				return;
			}
		});
	});
};

exports.deleteLesson = function(id, userId,  callback) {
	logger.info('Deleting lesson');
	dbManager.connect('lessons', function(db, collection, done) {
		collection.remove({
			'_id' : dbManager.id(id) ,
            'userId' : userId
		}, function(err) {
			if (!!err) {
				logger.error('unable to query for user [%s]', err.message);
			}
			done();
			callback(err);
		});
	});
};


exports.getLesson = function( filter , callback) {
	logger.info('Fetching lesson by ID');
	dbManager.connect('lessons', function(db, collection, done) {
		collection.findOne(filter, function(err, result) {
			if (!!err) {
				logger.error('unable to query for lesson [%s]', err.message);
			}
			done();
			callback(err, result);
		});
	});
};

exports.getUserLessons = function( userId, callback) {
	logger.info('Getting lessons');
	dbManager.connect('lessons', function(db, collection, done) {

		collection.find({'userId' : userId }).toArray(function(err, result) {
			if (!!err) {
				logger.error('unable to query for lessons [%s]', err.message);
			}
			done();
			callback(err, result);
		});
	});
};