var _ = require('lodash');
var keystone = require('keystone');
var NavLink = keystone.list('NavLink');

exports.navLinks = function (req, res, next) {
  NavLink.model.find().where('state', 'published').sort('sortOrder')
    .exec(function (err, navLinks) {
        if (err) return next(err);
        res.locals.navLinks = navLinks;
        next();
    });
};

exports.initLocals = function (req, res, next) {
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
