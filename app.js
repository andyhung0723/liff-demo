const express = require("express");

const app = express();

const indexRouter = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);
app.use(express.static("views"));

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end("err" + err.message);
});

const port = process.env.port || 3000;

app.listen(port, function () {
  console.log("Server listen on port ", port);
});
