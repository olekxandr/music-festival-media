const keystone = require('keystone')
const PhotoGallery = keystone.list('Gallery')

exports = module.exports = function(req, res) {
		PhotoGallery
		.model
		.findOne({
			slug: req.params.slug
		})
		.exec(function (err, photos) {
			if (err) return res.json(400)
			return res.json(photos)
		})
};
