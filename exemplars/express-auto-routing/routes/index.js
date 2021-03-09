const { readdirSync, lstatSync } = require("fs");
const { join } = require("path");
const router = require("express").Router();

const requireFiles = (dir) => {
  readdirSync(dir).forEach((file) => {
    const filePath = join(dir, file);
    if (lstatSync(filePath).isDirectory()) {
      // If directory
      requireFiles(filePath);
    } else {
      // Skip this file
      if (file === "index.js" && dir === __dirname) return;

      // get its relative path under /routes
      let route = filePath.replace(__dirname, "");
      // remove '.js'
      route = route.replace(/.js$/, "");
      // remove 'slash'
      route = route.replace(/base$/, "");
      // replace \ with /
      route = route.replace(/\\/g, "/");

      // Require the file
      router.use(route, require(filePath));
    }
  });
};

requireFiles(__dirname);

module.exports = router;
