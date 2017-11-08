let fs = require('fs');

/* We need this since we include clicky.com files in index.html, and then vue-gh-pages messes it up. */

fs.readFile('dist/index.html', 'utf-8', function (err, data) {
  if (err) throw err;

  let newValue = data.replace(/src=\/\//g, 'src=///');

  fs.writeFile('dist/index.html', newValue, 'utf-8', function (err) {
    if (err) throw err;
    console.log('Done changing file');
  });
});
