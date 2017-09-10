const express = require('express');
const path = require('path');

const server = express();
server.use(express.static(path.resolve(__dirname, 'dist')));
server.listen(3000, () => {
  console.log('Build preview of diamond-sweeper listening on port 3000!');
});
