'use strict';
var LessonInvitation = require('../models').LessonInvitation;
var logger = require('log4js').getLogger('LessonsInvitationsMiddleware');


exports.exists= function exists( req, res, next ){
    logger.debug('checking if invitation exists : ' , req.params.invitationId );
    try {
        LessonInvitation.findById(req.params.invitationId, function (err, result) {
            if (!!err) {
                res.send(500, err);
                return;
            }
            if (!result) {
                res.send(404);
                return;
            }

            logger.debug('putting invitation on request', result);
            req.invitation = result;

            next();

        });
    }catch(e){
        res.send(404);
    }
};