// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require("dotenv").config();

// Require keystone
var keystone = require("keystone");
var handlebars = require("express-handlebars");

function convertToSlug(Text) {
	return Text.toLowerCase()
		.replace(/[^\w ]+/g, "")
		.replace(/ +/g, "-");
}

function handleMongo(name, env, mongoUri) {
	if (mongoUri) return mongoUri;

	if (env === "production") {
		return "mongodb://localhost:27017/app";
	} else {
		return "mongodb://localhost:27017/" + convertToSlug(name);
	}
}

keystone.init({
	name: "VIIIA",
	brand: "VIIIA",

	sass: "public",
	static: "public",
	favicon: "public/favicon.ico",
	views: "templates/views",
	"view engine": "hbs",
	"session store": process.env.NODE_ENV === "production" ? "mongo" : null,

	mongo:
		"mongodb://viiiaadmin:password@3.80.62.66:27017/viiia?authSource=admin",

	"custom engine": handlebars.create({
		layoutsDir: "templates/views/layouts",
		partialsDir: "templates/views/partials",
		defaultLayout: "default",
		helpers: new require("./templates/views/helpers")(),
		extname: ".hbs",
	}).engine,

	emails: "templates/emails",

	"auto update": true,
	session: true,
	auth: true,
	"user model": "User",
	"cloudinary folders": true,
	"frame guard": false,
});
keystone.import("models");
keystone.set("locals", {
	_: require("lodash"),
	env: keystone.get("env"),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set("routes", require("./routes"));
keystone.set("nav", {
	global: [
		"galleries",
		"book-us-pages",
		"our-team-pages",
		"home-page-videos",
		"video-links",
		"nav-links",
	],
	outreach: ["enquiries", "posts", "post-categories"],
	hr: ["users"],
});

keystone.start();
