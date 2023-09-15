var keystone = require('keystone');
var Gallery = keystone.list('VideoLink');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'video-gallery';
    locals.pageTitle = 'All Videos'

	view.query(
      'galleries',
       Gallery.model.find().sort('sortOrder')
    );

	view.render('videoGallery');

};
