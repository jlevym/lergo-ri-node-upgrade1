'use strict';

var managers = require('../managers');

/**
 *
 * gets class reports I invited.
 *
 *
 * in this scenario there might not be a userId on the report.
 * we go by the data.inviter field which holds the inviter's userId - only users can invite..
 *
 *
 * @param req - the request
 * @param res - the response
 */
exports.getUserClassReports = function (req, res) {
    if (!req.queryObj || !req.queryObj.filter) {
        res.status(500).send('no filter or query object available');
        return;
    }

    req.queryObj.filter['data.inviter'] = req.sessionUser._id.toString();

    managers.classReports.complexSearch(req.queryObj, function (err, obj) {
        if (!!err) {
            err.send(res);
        } else {
            res.send(obj);
        }
    });
};

exports.readReportById = function (req, res) {
    res.send(req.report);
};

