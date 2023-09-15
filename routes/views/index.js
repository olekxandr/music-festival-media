var keystone = require('keystone');
var Gallery = keystone.list('Gallery');
var VideoLink = keystone.list('VideoLink');
var HomePageVideo = keystone.list('HomePageVideo');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	view.query('photoGalleries', Gallery.model.find().sort('sortOrder'));
	view.query('videoGalleries', VideoLink.model.find().sort('sortOrder'));
    view.query('homePageVideos', HomePageVideo.model.find().where('state', 'published').sort('sortOrder'))

	// Render the view
	view.render('index');
};
