var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'bookUs';

	// Load the bookus page
	view.query('page', keystone.list('BookUsPage').model.findOne().where('state', 'published').populate('featuredVideoLinks'));

	// Render the view
	view.render('bookUs');

};
