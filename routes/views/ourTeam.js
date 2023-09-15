var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'bookUs';

	// Load the bookus page
	view.query(
      'page',
      keystone
      .list('OurTeamPage')
      .model
      .findOne()
      .where('state', 'published')
      .populate('teamMembers')
    );

	// Render the view
	view.render('ourTeam');

};
