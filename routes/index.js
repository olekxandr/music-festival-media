var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.navLinks);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.get('/photo-gallery', routes.views.photoGallery);
	app.get('/video-gallery', routes.views.videoGallery);
    app.get('/book-us', routes.views.bookUs);
    app.get('/our-team', routes.views.ourTeam);
	app.get('/api/photos/:slug', routes.api.photoDetail);
	app.all('/contact', routes.views.contact);
};
