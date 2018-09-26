#! /usr/bin/env node
var shell = require("shelljs");

shell.echo("Running shell commands...");
shell.exec(
  "export GOOGLE_APPLICATION_CREDENTIALS=MyFirstProject-f27240d3a3f3.json && nodemon ./bin/www"
);
