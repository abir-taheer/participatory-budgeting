const
	fs = require("fs"),
	meta = require("./config/meta"),
	dotenv = require('dotenv'),
	db = require("./config/database"),
	app_port = process.env.PORT || 3001,
	bodyParser = require("body-parser"),
	cookieParser = require('cookie-parser'),
	path = require("path"),
	express = require("express"),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	morgan = require("morgan"),
	expressSession = require("express-session"),
	SequelizeConnectSession = require('connect-session-sequelize')(expressSession.Store),
	sequelizeStore = new SequelizeConnectSession({db: db.sequelize}),
	session = expressSession({
		secret: process.env.SESSION_SECRET || "some_semi_permanent_secret",
		name: "session",
		resave: true,
		saveUninitialized: false,
		store: sequelizeStore,
		cookie: {
			path: '/',
			httpOnly: true,
			secure: false,
			maxAge: Number(process.env.SESSION_MAX_AGE) || (15 * 86400 * 1000)
		},
		rolling: true
	});

dotenv.config();

sequelizeStore.sync();

app.use(session);

app.use(cookieParser(process.env.SESSION_SECRET || "some_semi_permanent_secret"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	morgan(
		process.env.MORGAN_FORMAT || "dev",
		{skip: (req, res) =>  res.statusCode < 400}
	)
);

const index_file = fs.readFileSync("./client/build/index.html").toString();

const handleDefaultNavigation = (req, res) => {
	// Cache requests for 5 days
	// cache_age represents the number of seconds to cache the page
	let cache_age = 60 * 60 * 24 * 5;
	res.set('Cache-Control', `public, max-age=${cache_age}`); // 5 days
	res.send(meta.fillPlaceholders(index_file, req.path));
};

// Catch the index page before it is handled statically
// Otherwise server side rendering doesn't happen
app.route("/").get(handleDefaultNavigation);

app.use(express.static(path.join(__dirname, 'client/build')));

// OTHER ROUTES
app.use("/", require("./routes"));

// Fallback to react for non-static files
app.route("*").get(handleDefaultNavigation);

server.listen(app_port, () => {
	console.log('listening on *:' + app_port);
});
