const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("GET / This is the root URL");
});

/*
app.use((err, req, res, next) => {
	const newErr = new Error("Sorry, the requested resource couldn't be found");
	newErr.statusCode = 404;
	next(newErr);
});

app.use((err, req, res, next) => {
	console.log("object");
	res.json({
		message: err.message,
		statusCode: err.statusCode || 500,
	});
});*/
app.get("/*", (req, res) => {
	throw new Error();
});

app.use((err, req, res, next) => {
	err.statusCode = 404;
	err.message = "Sorry, the requested resource couldn't be found";
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.statusCode || 500).json({
		message: err.message,
		statusCode: err.statusCode || 500,
	});
});

const port = 5000;
app.listen(port, () => console.log("Server is listening on port", port));
